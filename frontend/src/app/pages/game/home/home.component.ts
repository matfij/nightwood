import { Component, OnInit } from '@angular/core';
import { EXPEDITION_REPORTS, StoreService } from 'src/app/common/services/store.service';
import { DisplayExpeditionReport } from 'src/app/core/definitions/expeditions';
import { EngineService } from 'src/app/core/services/engine.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  reports: DisplayExpeditionReport[] = [];
  reportsLoading: boolean = false;

  constructor(
    private engineService: EngineService,
    private storeService: StoreService,
  ) {}

  ngOnInit(): void {
    // this.checkExpeditionsFinished();
  }

  checkExpeditionsFinished() {
    this.reportsLoading = true;
    this.engineService.getExpeditionReports().subscribe(() => {
      this.reportsLoading = false;
      const savedReports = this.storeService.getComplexItem<DisplayExpeditionReport[]>(EXPEDITION_REPORTS);
      if (savedReports && savedReports.length > 0) {
        this.reports = savedReports;
      }
    }, () => this.reportsLoading = false);
  }

}
