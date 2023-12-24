import { Component, inject } from '@angular/core';
import { FrontPageService } from '../../data/front-page/front-page.service';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'hn-front-page',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NgTemplateOutlet,
    MatListModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  providers: [FrontPageService],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.scss',
})
export class FrontPageComponent {
  private readonly frontPageSvc = inject(FrontPageService);

  status = this.frontPageSvc.status;
  topStories = this.frontPageSvc.stories;
  error = this.frontPageSvc.error;
  page = this.frontPageSvc.page;
  numberHits = this.frontPageSvc.numberHits;
  hitsPerPage = this.frontPageSvc.hitsPerPage;
  page$ = this.frontPageSvc.goToPage$;

  onPageChange($event: PageEvent) {
    this.page$.next($event.pageIndex);
  }
}
