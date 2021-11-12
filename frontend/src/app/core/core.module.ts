import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [];
const MODULES = [
  ReactiveFormsModule,
];
const CHILD_PROVIDERS = [];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MODULES
  ],
  providers: [],
  exports: [
    ...MODULES
  ],
})
export class CoreModule {
  public static forChild(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }
}
