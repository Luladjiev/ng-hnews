import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../data/item/item.service';
import { LoaderComponent } from '../../../../shared/ui/loader/loader.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'hn-item',
  standalone: true,
  imports: [LoaderComponent, MatButtonModule, MatIconModule],
  providers: [Router, ItemService],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent implements OnInit {
  route = inject(ActivatedRoute);
  itemSvc = inject(ItemService);

  status = this.itemSvc.status;
  item = this.itemSvc.item;

  ngOnInit() {
    this.itemSvc.getItem$.next(this.route.snapshot.paramMap.get('itemId'));
  }
}
