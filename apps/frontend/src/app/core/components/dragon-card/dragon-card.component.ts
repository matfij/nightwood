import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DragonDto } from 'src/app/client/api';
import { DisplayDragon } from '../../definitions/dragons';
import { DateService } from '../../../common/services/date.service';
import { DragonService } from '../../services/dragons.service';

@Component({
  selector: 'app-dragon-card',
  templateUrl: './dragon-card.component.html',
  styleUrls: ['./dragon-card.component.scss']
})
export class DragonPreviewComponent implements OnInit {

  @Input() dragon!: DisplayDragon;
  @Output() release: EventEmitter<number> = new EventEmitter<number>();

  feedAvailable: boolean = false;
  feedLoading: boolean = false;
  displayFeed: boolean = false;
  displaySkills: boolean = false;
  displayEquipment: boolean = false;
  displayStatistics: boolean = false;
  displayReleaseModal: boolean = false;

  DRAGON_ATTRIBUTES = ['strength', 'dexterity', 'endurance', 'will', 'luck'];

  constructor(
    private dateService: DateService,
    private dragonService: DragonService,
  ) {}

  ngOnInit(): void {
    if (this.dragon) {
      this.dragon = this.dragonService.toDisplayDragon(this.dragon);
      this.feedAvailable = this.dateService.checkIfEventAvailable(this.dragon.nextFeed);
    }
  }

  getDragonAttribute(attribute: string) {
    return this.dragon ? (this.dragon as any)[attribute] : 0;
  }

  updateDragonFeed(dragon: DragonDto) {
    this.dragon = {
      ...this.dragon,
      ...dragon,
    };
    this.feedAvailable = false;
    this.displayFeed = false;
  }

  updateDragonSkills(dragon: DragonDto) {
    this.dragon = {
      ...this.dragon,
      ...dragon,
    };
    this.displaySkills = false;
  }

  prepareFeedModal() {
    if (!this.feedAvailable) return;
    this.displayFeed = true;
  }

  onRelease(dragonId: number) {
    this.displayReleaseModal = false;
    this.release.next(dragonId);
  }

}
