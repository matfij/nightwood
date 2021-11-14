import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';

const COMPONENTS = [];
const MODULES = [
  ReactiveFormsModule,
  ToastrModule.forRoot({
    positionClass :'toast-bottom-center'
  }),
  TranslateModule.forChild(),
];
const CHILD_PROVIDERS = [
  ...(TranslateModule.forChild().providers ?? [])
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MODULES
  ],
  providers: [],
  exports: [
    MODULES
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
