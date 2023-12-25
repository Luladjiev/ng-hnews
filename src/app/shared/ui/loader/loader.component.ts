import { Component, HostBinding, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'hn-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  @Input()
  state: 'loading' | 'error' | 'success' = 'loading';

  @HostBinding('class')
  get hostClass() {
    return this.state;
  }
}
