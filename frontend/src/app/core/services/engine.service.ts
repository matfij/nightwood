import { Injectable } from "@angular/core";
import { Observable, of, zip } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { ActionController, DragonController, ExpeditionReportDto, GetDragonDto, PageDragonDto } from "src/app/client/api";
import { DateService } from "src/app/common/services/date.service";
import { RepositoryService } from "src/app/common/services/repository.service";
import { StoreService } from "src/app/common/services/store.service";
import { DisplayExpeditionReport, DisplayExpeditionLoot } from "../definitions/expeditions";

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  constructor(
    private actionController: ActionController,
    private dragonController: DragonController,
    private dateService: DateService,
    private repositoryService: RepositoryService,
    private storeService: StoreService,
  ) {}

  getExpeditionReports(): Observable<DisplayExpeditionReport[]> {
    const dto: GetDragonDto = {
      ownerId: this.repositoryService.getUserData().id,
    };
    return this.dragonController.getAll(dto).pipe(
      switchMap((page: PageDragonDto) => {
        const reports$: Observable<ExpeditionReportDto>[] = [];
        page.data.forEach(dragon => {
          if (this.dateService.checkIfEventAvailable(dragon.action.nextAction) && !dragon.action.awardCollected) {
            reports$.push(this.actionController.endExpedition(dragon));
          }
        });
        if (reports$.length > 0) return zip(...reports$);
        else return of([]);
      }),
      map(reports => reports.map(x => this.mapExpeditionReport(x)))
    );
  }

  mapExpeditionReport(report: ExpeditionReportDto): DisplayExpeditionReport {
    const loots: DisplayExpeditionLoot[] = report.loots.map(x => { return { name: x.name, quantity: x.quantity! } });
    const displayReport: DisplayExpeditionReport = {
      generationDate: this.dateService.date,
      dragonName: report.dragonName,
      expeditionName: report.expeditionName,
      loots: loots,
    };
    return displayReport;
  }
}
