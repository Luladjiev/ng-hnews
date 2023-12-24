import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'hn-page-two',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-two.component.html',
  styleUrl: './page-two.component.scss',
})
export class PageTwoComponent {}
