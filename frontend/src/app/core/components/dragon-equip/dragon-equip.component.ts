import { Component, Input, OnInit } from '@angular/core';
import { ActionController, DragonController, DragonDto, DragonEquipDto, ItemController, ItemType } from 'src/app/client/api';
import { DRAGON_MAX_RUNES } from 'src/app/client/config/frontend.config';
import { AbstractModalComponent } from 'src/app/common/components/abstract-modal/abstract-modal.component';
import { DisplayDragon } from '../../definitions/dragons';
import { DisplayItem } from '../../definitions/items';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-dragon-equip',
  templateUrl: './dragon-equip.component.html',
  styleUrls: [
    '../../../common/components/abstract-modal/abstract-modal.component.scss',
    './dragon-equip.component.scss',
  ]
})
export class DragonEquipComponent extends AbstractModalComponent implements OnInit {

  @Input() dragon!: DragonDto;

  dragonRunes: DisplayItem[] = [];
  availableEquipment: DisplayItem[] = [];
  equipmentLoading: boolean = false;
  equipLoading: boolean = false;

  constructor(
    private actionController: ActionController,
    private dragonController: DragonController,
    private itemController: ItemController,
    private itemsService: ItemsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAvailableEquipment();
    this.getDragonData();
  }

  getDragonData() {
    this.dragonController.getOne(this.dragon.id.toString()).subscribe(dragon => {
      this.dragon = dragon;
      this.dragonRunes = this.dragon.runes.map(rune => this.itemsService.toDisplayItem(rune));
    });
  }

  getAvailableEquipment() {
    this.equipmentLoading = true;
    this.itemController.getOwnedItems().subscribe(equipmentPage => {
      this.equipmentLoading = false;
      this.availableEquipment = equipmentPage.data
        .filter(item => item.type === ItemType.Equipment)
        .map(item => this.itemsService.toDisplayItem(item));
    }, () => this.equipmentLoading = false);
  }

  equipRune(rune: DisplayItem) {
    if (this.dragonRunes.length >= DRAGON_MAX_RUNES) { return; }
    if (this.dragon.level < rune.level) { return; }

    const params: DragonEquipDto = {
      dragonId: this.dragon.id,
      itemId: rune.id!,
    };
    this.equipLoading = true;
    this.actionController.equipDragon(params).subscribe(() => {
      this.equipLoading = false;
      this.getDragonData();
      this.getAvailableEquipment();
    }, () => this.equipLoading = false);
  }

  unequipRune(rune: DisplayItem) {
    const params: DragonEquipDto = {
      dragonId: this.dragon.id,
      itemId: rune.id!,
    };
    this.equipLoading = true;
    this.actionController.unequipDragon(params).subscribe(() => {
      this.equipLoading = false;
      this.getDragonData();
      this.getAvailableEquipment();
    }, () =>  this.equipLoading = false);
  }

}
