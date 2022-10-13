import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";
import { ToastrModule } from "ngx-toastr";
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        ToastrModule.forRoot({}),
        TranslateModule.forRoot({}),
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render app brand name, hint and image', () => {
    const nameElement = fixture.debugElement.query(By.css('[data-testid="app-title"]')).nativeElement;
    const hintElement = fixture.debugElement.query(By.css('[data-testid="app-hint"]')).nativeElement;
    const brandImageElement = fixture.debugElement.query(By.css('[data-testid="app-brand-image"]')).nativeElement;

    expect(nameElement.textContent).toBe('common.appName');
    expect(hintElement.textContent).toBe('common.appHint');
    expect(brandImageElement.src).toContain('/assets/img/app/logo.png');
  });

  it('should render login form', () => {
    const nicknameLabelElement = fixture.debugElement.query(By.css('[data-testid="app-nickname-label"]')).nativeElement;
    const nicknameInutElement = fixture.debugElement.query(By.css('[data-testid="app-nickname-input"]')).nativeElement;
    const passwordLabelElement = fixture.debugElement.query(By.css('[data-testid="app-password-label"]')).nativeElement;
    const passwordInputElement = fixture.debugElement.query(By.css('[data-testid="app-password-input"]')).nativeElement;
    const loginButtonElement = fixture.debugElement.query(By.css('[data-testid="app-login-button"]')).nativeElement;
    const registerButtonElement = fixture.debugElement.query(By.css('[data-testid="app-register-button"]')).nativeElement;

    expect(nicknameLabelElement.textContent).toBe('start.nickname');
    expect(nicknameInutElement).toBeTruthy();
    expect(passwordLabelElement.textContent).toBe('start.password');
    expect(passwordInputElement).toBeTruthy();
    expect(loginButtonElement.textContent).toBe(' start.login ');
    expect(registerButtonElement.textContent).toBe(' start.register ');
  });

  it('should login successfully', () => {

  });
});
