import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ActionController, DragonController, DragonDto, DragonEquipDto, ItemController, ItemType } from 'src/app/client/api';
import { DRAGON_MAX_RUNES } from 'src/app/client/config/frontend.config';
import { AbstractModalComponent } from 'src/app/common/components/abstract-modal/abstract-modal.component';
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

  dragonRunes$?: Observable<DisplayItem[]>;
  dragonRunes?: DisplayItem[];
  availableEquipment$?: Observable<DisplayItem[]>;
  availableEquipment?: DisplayItem[];
  equipRune$?: Observable<DragonDto>;
  unequipRune$?: Observable<DragonDto>;
  equipping: boolean = false;

  constructor(
    private actionController: ActionController,
    private dragonController: DragonController,
    private itemController: ItemController,
    private itemsService: ItemsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDragonData();
  }

  getDragonData() {
    this.dragonRunes$ = this.dragonController.getOne(this.dragon.id.toString()).pipe(
      tap((dragon) => {
        this.dragon = dragon;
        this.getAvailableEquipment();
      }),
      map((dragon) => dragon.runes.map(rune => this.itemsService.toDisplayItem(rune))),
      tap((runes) => {
        this.dragonRunes = runes;
      })
    );
  }

  getAvailableEquipment() {
    this.availableEquipment$ = this.itemController.getOwnedItems().pipe(
      map((itemsPage) => itemsPage.data.filter(item => item.type === ItemType.Equipment)),
      map((items) => items.map(item => this.itemsService.toDisplayItem(item))),
      tap((items) => {
        this.availableEquipment = items;
        this.equipping = false;
      })
    );
  }

  equipRune(rune: DisplayItem) {
    if (this.equipping) return;
    if (this.dragon.runes.length >= DRAGON_MAX_RUNES) return;
    if (this.dragon.level < rune.level) return;

    const params: DragonEquipDto = {
      dragonId: this.dragon.id,
      itemId: rune.id!,
    };
    this.equipping = true;
    this.equipRune$ = this.actionController.equipDragon(params).pipe(
      tap(() => this.getDragonData())
    );
  }

  unequipRune(rune: DisplayItem) {
    if (this.equipping) return;
    const params: DragonEquipDto = {
      dragonId: this.dragon.id,
      itemId: rune.id!,
    };
    this.equipping = true;
    this.unequipRune$ = this.actionController.unequipDragon(params).pipe(
      tap(() => this.getDragonData())
    );
  }

}
