import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { EngineService } from './engine.service';
import { ExpeditionReportDto, UserAuthDto, UserRole } from 'src/app/client/api';

describe('EngineService', () => {
  let service: EngineService;
  let httpTestingController: HttpTestingController;
  const initialUserData: UserAuthDto = {
    id: 0,
    accessToken: '',
    refreshToken: '',
    gold: 100,
    eter: 0,
    maxOwnedDragons: 3,
    nickname: 'player',
    ownedDragons: 1,
    role: UserRole.Player,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        ToastrModule.forRoot({}),
        TranslateModule.forRoot({}),
      ],
      providers: [],
    });
    service = TestBed.inject(EngineService);
    httpTestingController = TestBed.inject(HttpTestingController);
    service.setInitialState(initialUserData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should read user data', () => {
    service.getUser().subscribe((user) => {
      expect(user).toBe(initialUserData);
    });
  });

  it('should update user data', () => {
    const updateUserData: Partial<UserAuthDto> = {
      gold: 500,
      ownedDragons: 2,
    };
    service.updateUser(updateUserData);

    service.getUser().subscribe((user) => {
      expect(user.gold).toBe(updateUserData.gold || NaN);
      expect(user.ownedDragons).toBe(updateUserData.ownedDragons || NaN);
    });
  });

  it('should get unread mails count', (done: DoneFn) => {
    const mailsData = {
      length: 3,
      data: [{}, {}, {}],
    };

    service.checkMails().subscribe((mailCount) => {
      expect(mailCount).toBeTruthy();
      expect(mailCount).toEqual(3);
      done();
    });

    const request = httpTestingController.expectOne('/api/v1/mail/checkUnread');
    request.flush(new Blob([JSON.stringify(mailsData)], { type: 'application/json' }));
  });

  it('should get expedition reports', (done: DoneFn) => {
    const expeditionReports: ExpeditionReportDto[] = [
      {
        dragonName: 'dial',
        expeditionName: 'forest',
        gainedGold: 50,
        loots: [],
      }
    ];
    service.getExpeditionReports().subscribe(reports => {
      expect(reports).toEqual(expeditionReports);
      done();
    });

    const request = httpTestingController.expectOne('/api/v1/action/checkExpeditions');
    request.flush(new Blob([JSON.stringify(expeditionReports)], { type: 'application/json' }));
  });
});
