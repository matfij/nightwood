import { Component, Input, OnInit } from '@angular/core';
import { ActionController, ItemController, ItemDto, ItemType } from 'src/app/client/api';
import { AbstractModalComponent } from 'src/app/common/components/abstract-modal/abstract-modal.component';
import { DisplayDragon } from '../../definitions/dragons';

@Component({
  selector: 'app-dragon-equip',
  templateUrl: './dragon-equip.component.html',
  styleUrls: [
    '../../../common/components/abstract-modal/abstract-modal.component.scss',
    './dragon-equip.component.scss',
  ]
})
export class DragonEquipComponent extends AbstractModalComponent implements OnInit {

  @Input() dragon!: DisplayDragon;

  availableEquipment: ItemDto[] = [];
  equipmentLoading: boolean = false;

  constructor(
    private actionController: ActionController,
    private itemController: ItemController,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAvailableEquipment();
  }

  getAvailableEquipment() {
    this.equipmentLoading = true;
    this.itemController.getOwnedItems().subscribe(equipmentPage => {
      this.equipmentLoading = false;
      this.availableEquipment = equipmentPage.data.filter(item => item.type === ItemType.Equipment);
    }, () => this.equipmentLoading = false);
  }

}
