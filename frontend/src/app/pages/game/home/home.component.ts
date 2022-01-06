import { Component, OnInit } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { zipAll } from 'rxjs/operators';
import { ActionController, DragonController, GetDragonDto, GetUserDto, PageDragonDto, UserController, UserDto, ExpeditionReportDto } from 'src/app/client/api';
import { DateService } from 'src/app/common/services/date.service';
import { RepositoryService } from 'src/app/common/services/repository.service';
import { StoreService } from 'src/app/common/services/store.service';
import { DisplayExpeditionLoot, DisplayExpeditionReport } from 'src/app/core/definitions/expeditions';
import { DragonService } from 'src/app/core/services/dragons.service';
import { EngineService } from 'src/app/core/services/engine.service';
import { DisplayExpedition } from '../expeditions/expeditions.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: UserDto[] = [];

  reports!: DisplayExpeditionReport[];
  reportsLoading!: boolean;

  constructor(
    private actionController: ActionController,
    private dragonController: DragonController,
    private userController: UserController,
    private dateService: DateService,
    private repositoryService: RepositoryService,
    private storeService: StoreService,
    private engineService: EngineService,
  ) {}

  ngOnInit(): void {
    this.reportsLoading = false;
    this.reports = [];

    this.checkExpeditionsFinished();
    this.getActiveUsers();
  }

  getActiveUsers() {
    const dto: GetUserDto = {};
    this.userController.getAll(dto).subscribe(x => {
      this.users = x.data;
    });
  }

  checkExpeditionsFinished() {
    this.reportsLoading = true;
    this.engineService.getExpeditionReports().subscribe(reports => {
      this.reportsLoading = false;
      this.reports = reports;
    }, () => this.reportsLoading = false);
  }



}
