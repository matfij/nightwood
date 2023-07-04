import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ActionController, DragonController, DragonDto } from 'src/app/client/api';
import { ToastService } from 'src/app/common/services/toast.service';

@Component({
  selector: 'app-my-dragons',
  templateUrl: './my-dragons.component.html',
  styleUrls: ['./my-dragons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyDragonsComponent implements OnInit {

  dragonsLoading$ = new BehaviorSubject(false);
  ownedDragons$?: Observable<DragonDto[]>;
  releaseDragon$?: Observable<void>;

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
    this.dragonsLoading$.next(true);
    this.ownedDragons$ = this.dragonController.getOwned().pipe(
      tap(() => this.dragonsLoading$.next(false))
    );
  }

  navigateAdopt() {
    this.router.navigate(['game', 'adopt-dragon']);
  }

  release(dragonId: number) {
    this.dragonsLoading$.next(true);
    this.ownedDragons$ = undefined;
    this.releaseDragon$ = this.actionController.releaseDragon(dragonId.toString()).pipe(
      tap(() => {
        this.getOwnedDragons();
        this.toastService.showSuccess('common.success', 'dragon.dragonReleased');
      }),
      catchError(() => {
        this.dragonsLoading$.next(false);
        return of(undefined);
      })
    );
  }

}
