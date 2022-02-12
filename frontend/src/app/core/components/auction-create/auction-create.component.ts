import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuctionController, ItemController, ItemDto, PageItemDto } from 'src/app/client/api';
import { AbstractModalComponent } from '../abstract-modal/abstract-modal.component';

@Component({
  selector: 'app-auction-create',
  templateUrl: './auction-create.component.html',
  styleUrls: [
    './auction-create.component.scss',
    '../abstract-modal/abstract-modal.component.scss',
  ]
})
export class AuctionCreateComponent extends AbstractModalComponent implements OnInit {

  tradableItems$?: Observable<PageItemDto>;
  itemsLoading: boolean = false;

  constructor(
    private auctionController: AuctionController,
    private itemController: ItemController,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getTradableItems();
  }

  getTradableItems() {
    this.tradableItems$ = this.itemController.getOwnedFoods();
  }

}
