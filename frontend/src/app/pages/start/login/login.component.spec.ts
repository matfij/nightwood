import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";
import { ToastrModule } from "ngx-toastr";
import { RegisterComponent } from "../register/register.component";
import { LoginComponent } from './login.component';
import { AuthController, UserAuthDto, UserRole } from "src/app/client/api";
import { Observable, of } from "rxjs";
import { EngineService } from "src/app/core/services/engine.service";
import { ToastService } from "src/app/common/services/toast.service";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;
  let router: Router;
  let location: Location;
  let authController: AuthController;
  let engineService: EngineService;
  let toastService: ToastService;

  let nameElement: HTMLElement;
  let hintElement: HTMLElement;
  let brandImageElement: HTMLImageElement;
  let formElement: HTMLFormElement;
  let loginLabelElement: HTMLElement;
  let loginInutElement: HTMLInputElement;
  let loginErrorElement: HTMLElement;
  let passwordLabelElement: HTMLElement;
  let passwordInputElement: HTMLInputElement;
  let passwordErrorElement: HTMLElement;
  let loginButtonElement: HTMLButtonElement;
  let registerButtonElement: HTMLButtonElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
          { path: '**', redirectTo: 'login', pathMatch: 'full' },
        ]),
        ToastrModule.forRoot({}),
        TranslateModule.forRoot({}),
      ],
      providers: []
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
    authController = TestBed.inject(AuthController);
    engineService = TestBed.inject(EngineService);
    toastService = TestBed.inject(ToastService);

    fixture.detectChanges();
    nameElement = fixture.debugElement.query(By.css('[data-testid="app-title"]')).nativeElement;
    hintElement = fixture.debugElement.query(By.css('[data-testid="app-hint"]')).nativeElement;
    brandImageElement = fixture.debugElement.query(By.css('[data-testid="app-brand-image"]')).nativeElement;
    formElement = fixture.debugElement.query(By.css('[data-testid="app-login-form"]')).nativeElement;
    loginLabelElement = fixture.debugElement.query(By.css('[data-testid="app-login-label"]')).nativeElement;
    loginInutElement = fixture.debugElement.query(By.css('[data-testid="app-login-input"]')).nativeElement;
    passwordLabelElement = fixture.debugElement.query(By.css('[data-testid="app-password-label"]')).nativeElement;
    passwordInputElement = fixture.debugElement.query(By.css('[data-testid="app-password-input"]')).nativeElement;
    loginButtonElement = fixture.debugElement.query(By.css('[data-testid="app-login-button"]')).nativeElement;
    registerButtonElement = fixture.debugElement.query(By.css('[data-testid="app-register-button"]')).nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render app brand name, hint and image', () => {
    expect(nameElement.textContent).toBe('common.appName');
    expect(hintElement.textContent).toBe('common.appHint');
    expect(brandImageElement.src).toContain('/assets/img/app/logo.png');
  });

  it('should render login form', () => {
    expect(loginLabelElement.textContent).toBe('start.nickname');
    expect(loginInutElement).toBeTruthy();
    expect(passwordLabelElement.textContent).toBe('start.password');
    expect(passwordInputElement).toBeTruthy();
    expect(loginButtonElement.textContent).toBe(' start.login ');
    expect(registerButtonElement.textContent).toBe(' start.register ');
  });

  it('should fail login form validation', () => {
    loginInutElement.value = 'l';
    loginInutElement.dispatchEvent(new Event('input'));
    passwordInputElement.value = 'p';
    passwordInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges()

    loginErrorElement = fixture.debugElement.query(By.css('[data-testid="app-login-error"]')).nativeElement;
    passwordErrorElement = fixture.debugElement.query(By.css('[data-testid="app-password-error"]')).nativeElement;

    expect(loginErrorElement.textContent).toBe(' errors.incorrectFieldsValue ');
    expect(passwordErrorElement.textContent).toBe(' errors.incorrectFieldsValue ');
    expect(component.form.valid).toBe(false);
  });

  it('should fail to login with incorrect credentials', async () => {
    loginInutElement.value = 'login';
    loginInutElement.dispatchEvent(new Event('input'));
    passwordInputElement.value = 'password';
    passwordInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    loginButtonElement.click();

    const errorRes = { message: 'incorrect credentials' };
    const request = httpTestingController.expectOne('/api/v1/auth/login');
    request.flush(new Blob([JSON.stringify(errorRes)], { type: 'application/json' }), { status: 400, statusText: '' });

    await fixture.whenStable();
    expect(component.form.valid).toBe(true);
    expect(location.path()).toBe('/login');
  });

  it('should login successfully', async () => {
    const userData: UserAuthDto = {
      accessToken: 'a-01',
      gold: 100,
      id: 1,
      maxOwnedDragons: 5,
      nickname: 'user',
      ownedDragons: 3,
      role: UserRole.Player
    };

    loginInutElement.value = 'login';
    loginInutElement.dispatchEvent(new Event('input'));
    passwordInputElement.value = 'password';
    passwordInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const authSpy = spyOn(authController, 'login').and.returnValue(of(userData));
    const routerSpy = spyOn(router, 'navigate').and.callThrough();
    spyOn(engineService, 'getExpeditionReports').and.returnValue(of([]));

    loginButtonElement.click();
    fixture.detectChanges();

    await fixture.whenStable();
    expect(routerSpy).toHaveBeenCalledOnceWith(['../game/home']);
    expect(authSpy).toHaveBeenCalledOnceWith({ nickname: 'login', password: 'password' });
  });

  it('should navigate to register page on register button click', async () => {
    registerButtonElement.click();
    await fixture.whenStable();
    expect(location.path()).toBe('/register');
  });

  it('should successfully confirm user account activation', async () => {
    spyOn(authController, 'confirm').and.returnValue(of(void 0));
    const toastSpy = spyOn(toastService, 'showSuccess').and.callThrough();

    component.confirm('t-1');

    await fixture.whenStable();
    expect(toastSpy).toHaveBeenCalledOnceWith('start.loginSuccess', 'start.confirmSuccess');
  });
});
