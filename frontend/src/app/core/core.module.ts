import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { LoadingIndicatorComponent } from '../components/common/loading-indicator/loading-indicator.component';
import { InputBaseComponent } from '../components/forms/input-base/input-base.component';

const COMPONENTS = [
  InputBaseComponent,
  LoadingIndicatorComponent,
];
const MODULES = [
  ReactiveFormsModule,
  ToastrModule.forRoot({
    positionClass :'toast-bottom-center'
  }),
  TranslateModule.forChild(),
];
const CHILD_PROVIDERS = [
  ...(TranslateModule.forChild().providers ?? []),
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    ...MODULES
  ],
  providers: [],
  exports: [
    MODULES,
    ...COMPONENTS,
  ],
})
export class CoreModule {
  public static forChild(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: CHILD_PROVIDERS,
    };
  }
}
