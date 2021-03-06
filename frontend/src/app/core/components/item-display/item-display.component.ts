import { Component, Input, OnInit } from '@angular/core';
import { ItemDto, ItemType } from 'src/app/client/api';
import { DisplayItem } from '../../definitions/items';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-item-display',
  templateUrl: './item-display.component.html',
  styleUrls: ['./item-display.component.scss']
})
export class ItemDisplayComponent implements OnInit {

  @Input() item!: ItemDto;
  @Input() simplified: boolean = false;

  displayItem!: DisplayItem;
  ItemType = ItemType;

  constructor(
    private itemsService: ItemsService,
  ) {}

  ngOnInit(): void {
    this.displayItem = this.itemsService.toDisplayItem(this.item);
  }

}
