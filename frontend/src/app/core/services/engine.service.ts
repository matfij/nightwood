import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ActionController, ExpeditionReportDto } from "src/app/client/api";
import { DateService } from "src/app/common/services/date.service";
import { EXPEDITION_REPORTS, StoreService } from "src/app/common/services/store.service";
import { ToastService } from "src/app/common/services/toast.service";
import { DisplayExpeditionReport, DisplayExpeditionLoot } from "../definitions/expeditions";

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  constructor(
    private translateService: TranslateService,
    private actionController: ActionController,
    private dateService: DateService,
    private storeService: StoreService,
    private toastService: ToastService,
  ) {}

  getExpeditionReports(): Observable<DisplayExpeditionReport[]> {
    return this.actionController.checkExpeditions().pipe(
      map(reports => this.mapExpeditionReport(reports)),
      tap(reports => this.saveExpeditionReports(reports))
    );
  }

  mapExpeditionReport(reports: ExpeditionReportDto[]): DisplayExpeditionReport[] {
    return reports.map(report => {
      const loots: DisplayExpeditionLoot[] = report.loots.map(x => {
        return { name: x.name, quantity: x.quantity! }
      });
      const displayReport: DisplayExpeditionReport = {
        generationDate: this.dateService.date,
        dragonName: report.dragonName,
        expeditionName: report.expeditionName,
        loots: loots,
      };
      return displayReport;
    });
  }

  saveExpeditionReports(reports: DisplayExpeditionReport[]): void {
    if (reports.length) {
      this.storeService.setComplexItem(EXPEDITION_REPORTS, reports);

      reports.forEach(report => {
        const message = this.translateService.instant('explore.dragonFinishedExpedition', { dragon: report.dragonName });
        this.toastService.showSuccess('common.information', message);
      });
    }
  }
}
