import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { LoadingIndicatorComponent } from '../common/components/loading-indicator/loading-indicator.component';
import { InputBaseComponent } from '../common/components/input-base/input-base.component';
import { NavigationBarComponent } from '../common/components/navigation-bar/navigation-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragonPreviewComponent } from './components/dragon-preview/dragon-preview.component';

const COMPONENTS = [
  NavigationBarComponent,
  LoadingIndicatorComponent,
  InputBaseComponent,
  DragonPreviewComponent,
];
const MODULES = [
  ReactiveFormsModule,
  ToastrModule.forRoot({
    positionClass :'toast-bottom-center'
  }),
  TranslateModule.forChild(),
  NgbModule,
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
