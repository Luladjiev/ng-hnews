import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, switchMap } from 'rxjs';

interface Response {
  author: string;
  title: string;
  url: string;
  text?: string;
}

interface State {
  data?: Response;
  error?: string;
  status: 'loading' | 'error' | 'success';
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private readonly URL = 'https://hn.algolia.com/api/v1';
  private readonly http = inject(HttpClient);

  // State
  private readonly state = signal<State>({
    status: 'loading',
  });

  // Selectors
  status = computed(() => this.state().status);
  item = computed(() => this.state().data);

  // Actions
  getItem$ = new Subject();

  // Datasource
  private datasource$ = this.getItem$.pipe(
    switchMap((itemId) =>
      this.http.get<Response>(`${this.URL}/items/${itemId}`)
    )
  );

  constructor() {
    // Reducers
    this.datasource$.pipe(takeUntilDestroyed()).subscribe({
      next: (response) => {
        this.state.update((state) => ({
          ...state,
          data: response,
          status: 'success',
        }));
      },
      error: (error) => {
        this.state.update((state) => ({
          ...state,
          error: error.message,
          status: 'error',
        }));
      },
    });
  }
}
