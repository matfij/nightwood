import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
  availableEquipment$?: Observable<DisplayItem[]>;
  equipLoading: boolean = false;

  constructor(
    private cdRef: ChangeDetectorRef,
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
    this.dragonRunes$ = this.dragonController.getOne(this.dragon.id.toString()).pipe(
      tap((dragon) => this.dragon = dragon),
      map((dragon) => dragon.runes.map(rune => this.itemsService.toDisplayItem(rune)))
    );
  }

  getAvailableEquipment() {
    this.availableEquipment$ = this.itemController.getOwnedItems().pipe(
      map((itemsPage) => itemsPage.data.filter(item => item.type === ItemType.Equipment)),
      map((items) => items.map(item => this.itemsService.toDisplayItem(item)))
    );
  }

  equipRune(rune: DisplayItem) {
    if (this. equipLoading) return;
    if (this.dragon.runes.length >= DRAGON_MAX_RUNES) return;
    if (this.dragon.level < rune.level) return;

    const params: DragonEquipDto = {
      dragonId: this.dragon.id,
      itemId: rune.id!,
    };
    this.equipLoading = true;
    this.actionController.equipDragon(params).subscribe(() => {
      this.getDragonData();
      this.getAvailableEquipment();
      this.equipLoading = false;
      this.cdRef.detectChanges();
    }, () => this.equipLoading = false);
  }

  unequipRune(rune: DisplayItem) {
    if (this. equipLoading) return;

    const params: DragonEquipDto = {
      dragonId: this.dragon.id,
      itemId: rune.id!,
    };
    this.equipLoading = true;
    this.actionController.unequipDragon(params).subscribe(() => {
      this.getDragonData();
      this.getAvailableEquipment();
      this.equipLoading = false
      this.cdRef.detectChanges();
    }, () => this.equipLoading = false);
  }

}
