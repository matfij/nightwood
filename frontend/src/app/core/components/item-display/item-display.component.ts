import { Component, Input, OnInit } from '@angular/core';
import { ItemDto } from 'src/app/client/api';
import { DisplayItem } from '../../definitions/items';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-item-display',
  templateUrl: './item-display.component.html',
  styleUrls: ['./item-display.component.scss']
})
export class ItemDisplayComponent implements OnInit {

  @Input() item!: ItemDto;

  displayItem!: DisplayItem;

  constructor(
    private itemsService: ItemsService,
  ) {}

  ngOnInit(): void {
    this.displayItem = this.itemsService.setItemImage(this.item);
  }

}
