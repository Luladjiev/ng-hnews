import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

interface Story {
  story_id: number;
  url: string;
  title: string;
  points: number;
  author: string;
  num_comments: number;
  created_at: string;
}

interface Response {
  hitsPerPage: number;
  nbHits: number;
  nbPages: number;
  page: number;
  hits: Array<Story>;
}

interface State {
  data: Array<Story>;
  page: number;
  numberHits: number;
  hitsPerPage: number;
  error?: string;
  status: 'loading' | 'error' | 'success';
}

@Injectable({ providedIn: 'root' })
export class FrontPageService {
  private readonly URL = 'https://hn.algolia.com/api/v1';
  private readonly http = inject(HttpClient);

  // State
  private readonly state = signal<State>({
    data: [],
    page: 0,
    hitsPerPage: 0,
    numberHits: 0,
    status: 'loading',
  });

  // Actions
  goToPage$ = new Subject<number>();

  // Selectors
  status = computed(() => this.state().status);
  error = computed(() => this.state().error);
  stories = computed(() => this.state().data);
  page = computed(() => this.state().page);
  numberHits = computed(() => this.state().numberHits);
  hitsPerPage = computed(() => this.state().hitsPerPage);

  // Datasource
  private readonly datasource$ = toObservable(this.page).pipe(
    switchMap((page) => {
      const date = new Date().getTime() - 1000 * 60 * 60 * 24;
      const dateInSec = Math.floor(date / 1000);

      return this.http.get<Response>(
        `${this.URL}/search?tags=story&page=${page}&numericFilters=created_at_i>${dateInSec}&hitsPerPage=50`
      );
    })
  );

  constructor() {
    // Reducers
    this.datasource$.pipe(takeUntilDestroyed()).subscribe({
      next: (response) =>
        this.state.update(
          (state): State => ({
            ...state,
            data: response.hits,
            page: response.page,
            hitsPerPage: response.hitsPerPage,
            numberHits: response.nbPages * response.hitsPerPage,
            status: 'success',
          })
        ),
      error: (error: Error) =>
        this.state.update(
          (state): State => ({
            ...state,
            data: [],
            error: error.message,
            status: 'error',
          })
        ),
    });

    this.goToPage$.pipe(takeUntilDestroyed()).subscribe({
      next: (page) =>
        this.state.update(
          (state): State => ({
            ...state,
            status: 'loading',
            page: page,
          })
        ),
    });
  }
}
