import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionController, DragonController, DragonDto } from 'src/app/client/api';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-my-dragons',
  templateUrl: './my-dragons.component.html',
  styleUrls: ['./my-dragons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyDragonsComponent implements OnInit {

  ownedDragons: DragonDto[] = [];
  dragonsLoading: boolean = false;

  constructor(
    private router: Router,
    private actionController: ActionController,
    private dragonController: DragonController,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.getOwnedDragons();
  }

  getOwnedDragons(): void {
    this.dragonsLoading = true;
    this.dragonController.getOwned().subscribe(dragons => {
      this.dragonsLoading = false;

      this.ownedDragons = dragons;
    }, () => this.dragonsLoading = false)
  }

  navigateAdopt() {
    this.router.navigate(['game', 'adopt-dragon']);
  }

  release(dragonId: number) {
    this.dragonsLoading = true;
    this.actionController.releaseDragon(dragonId.toString()).subscribe(() => {
      this.dragonsLoading = false;
      this.toastService.showSuccess('common.success', 'dragon.dragonReleased');
      this.ownedDragons = this.ownedDragons.filter(dragon => dragon.id !== dragonId);
    }, () => this.dragonsLoading = false);
  }

}
