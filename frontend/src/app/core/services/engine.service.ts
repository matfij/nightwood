import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject, Observable, Subscription, timer } from "rxjs";
import { tap } from "rxjs/operators";
import { ActionController, AuthController, ExpeditionReportDto, UserAuthDto } from "src/app/client/api";
import { RepositoryService } from "src/app/common/services/repository.service";
import { ToastService } from "src/app/common/services/toast.service";

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  private user$!: BehaviorSubject<UserAuthDto>;
  private tick$?: Subscription;

  constructor(
    private actionController: ActionController,
    private authController: AuthController,
    private translateService: TranslateService,
    private toastService: ToastService,
    private repositoryService: RepositoryService,
  ) {}

  tick(): void {
    this.updateUserData();
    this.getExpeditionReports().subscribe();
  }

  start(): void {
    this.tick$ = timer(0, 5000).subscribe(() => { this.tick(); });
  }

  stop(): void {
    this.tick$?.unsubscribe();
  }

  setInitialState(userData: UserAuthDto): void {
    this.user$ = new BehaviorSubject<UserAuthDto>(userData);
  }

  get user(): UserAuthDto {
    return this.getUser().getValue();
  }

  getUser(): BehaviorSubject<UserAuthDto> {
    if (!this.user$) this.user$ = new BehaviorSubject<UserAuthDto>(this.repositoryService.getUserData());
    else if (!this.user$.getValue()) this.user$.next(this.repositoryService.getUserData());

    return this.user$;
  }

  updateUser(data: Partial<UserAuthDto>): void {
    if (!this.user$) this.user$ = new BehaviorSubject<UserAuthDto>(this.repositoryService.getUserData());

    if (data) {
      this.repositoryService.setUserData({ ...this.user, ...data });
      this.user$.next({ ...this.user, ...data });
    }
  }

  private updateUserData() {
    this.authController.getUserData().subscribe(data => {
      this.repositoryService.setUserData(data);
      this.user$.next(data);
    });
  }

  getExpeditionReports(): Observable<ExpeditionReportDto[]> {
    return this.actionController.checkExpeditions().pipe(
      tap(reports => this.notifyExpeditionStatus(reports)),
    );
  }

  private notifyExpeditionStatus(reports: ExpeditionReportDto[]) {
    reports.forEach(report => {
      const message = this.translateService.instant('explore.dragonFinishedExpedition', { dragon: report.dragonName });
      this.toastService.showSuccess('common.information', message);
    });
    return reports;
  }

}
