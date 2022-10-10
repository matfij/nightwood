import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { ToastrModule } from "ngx-toastr";
import { RouterTestingModule } from '@angular/router/testing';
import { EngineService } from "./engine.service";

describe('EngineService', () => {
  let service: EngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        ToastrModule.forRoot({}),
        TranslateModule.forRoot({}),
      ],
      providers: []
    });
    service = TestBed.inject(EngineService);
  });

  it('it should be created', () => {
    expect(service).toBeTruthy();
  })

});
