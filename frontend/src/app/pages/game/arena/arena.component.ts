import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DragonController, DragonDto, GetDragonDto } from 'src/app/client/api';
import { DisplayDragon } from 'src/app/core/definitions/dragons';
import { DragonService } from 'src/app/core/services/dragons.service';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss']
})
export class ArenaComponent implements OnInit {

  enemyDragonsLoading!: boolean;
  ownedDragonsLoading!: boolean;
  ownedDragons!: DisplayDragon[];
  enemyDragons!: DragonDto[];
  selectedDragonId?: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dragonController: DragonController,
    private dragonService: DragonService,
  ) {}

  ngOnInit(): void {
    this.ownedDragonsLoading = false;
    this.enemyDragonsLoading = false;
    this.ownedDragons = [];
    this.enemyDragons = [];

    this.activatedRoute.params.subscribe(params => {
      if (params && params['id']) this.selectedDragonId = params['id'];

      this.getOwnedDragons(params['id']);
      this.getEnemyDragons();
    });
  }

  getOwnedDragons(selectedId?: number) {
    this.ownedDragonsLoading = true;
    this.dragonController.getOwned().subscribe(dragons => {
      this.ownedDragonsLoading = false;
      this.ownedDragons = dragons.map(dragon => this.dragonService.toDisplayDragon(dragon));

      if (this.selectedDragonId) this.selectedDragonId = +this.selectedDragonId;
      else if (this.ownedDragons.length > 0) this.selectedDragonId = this.ownedDragons[0].id;
    }, () => this.ownedDragonsLoading = false);
  }

  getEnemyDragons(page?: number, limit?: number, minLevel?: number, maxLevel?: number) {
    const dto: GetDragonDto = {
      page: page ?? 0,
      limit: limit ?? 20,
      minLevel: minLevel,
      maxLevel: maxLevel,
    };
    this.enemyDragonsLoading = true;
    this.dragonController.getAll(dto).subscribe(dragonPage => {
      this.enemyDragonsLoading = false;
      this.enemyDragons = dragonPage.data;
    }, () => this.enemyDragonsLoading = false);
  }

  navigateAdopt() {
    this.router.navigate(['game', 'adopt-dragon']);
  }

  startBattle(dragonId: number) {
    if (!this.selectedDragonId && !dragonId) return;
    console.log(this.selectedDragonId, dragonId)
  }

}
