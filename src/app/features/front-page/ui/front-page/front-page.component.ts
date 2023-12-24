import { Component, inject } from '@angular/core';
import { FrontPageService } from '../../data/front-page/front-page.service';
import { RouterLink } from '@angular/router';
import {
  AsyncPipe,
  DatePipe,
  NgTemplateOutlet,
  SlicePipe,
} from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatLineModule } from '@angular/material/core';
import { DateAgoPipe } from '../../../../shared/pipes/date-ago.pipe';

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
    DatePipe,
    SlicePipe,
    MatLineModule,
    DateAgoPipe,
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
