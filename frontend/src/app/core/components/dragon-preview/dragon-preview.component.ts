import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DragonController, DragonNature } from 'src/app/client/api';
import { DisplayDragon } from '../../definitions/dragons';
import { DragonService } from '../../services/dragons.service';

@Component({
  selector: 'app-dragon-preview',
  templateUrl: './dragon-preview.component.html',
  styleUrls: ['./dragon-preview.component.scss']
})
export class DragonPreviewComponent implements OnInit {

  @Input() dragon?: DisplayDragon;

  constructor(
    private router: Router,
    private dragonController: DragonController,
    private dragonService: DragonService,
  ) {}

  ngOnInit(): void {
    if (this.dragon) {
      this.dragon = this.dragonService.setDragonImage(this.dragon);
    }
  }

  feedDragon() {

  }

  navigateExplore() {
    // todo - select current dragon
    this.router.navigate(['game', 'explore']);
  }

  navigateArena() {
    // todo - select current dragon
    this.router.navigate(['game', 'arena']);
  }

}
