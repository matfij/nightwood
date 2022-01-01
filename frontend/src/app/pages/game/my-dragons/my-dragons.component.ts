import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DragonController, DragonDto, GetDragonDto } from 'src/app/client/api';
import { RepositoryService } from 'src/app/common/services/repository.service';

@Component({
  selector: 'app-my-dragons',
  templateUrl: './my-dragons.component.html',
  styleUrls: ['./my-dragons.component.scss']
})
export class MyDragonsComponent implements OnInit {

  ownedDragons!: DragonDto[];
  dragonsLoading!: boolean;

  constructor(
    private router: Router,
    private dragonController: DragonController,
    private repositoryService: RepositoryService,
  ) {}

  ngOnInit(): void {
    this.dragonsLoading = true;
    this.ownedDragons = [];
    this.getOwnedDragons();
  }

  getOwnedDragons(): void {
    const params: GetDragonDto = {
      ownerId: this.repositoryService.getUserData().id,
    };
    this.dragonsLoading = true;
    this.dragonController.getAll(params).subscribe(x => {
      this.dragonsLoading = false;

      this.ownedDragons = x.data;
    }, () => this.dragonsLoading = false)
  }

  navigateAdopt() {
    this.router.navigate(['game', 'adopt-dragon']);
  }

}
