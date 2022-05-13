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
import { ItemDisplayComponent } from './components/item-display/item-display.component';
import { DragonChoiceModalComponent } from './components/dragon-choice-modal/dragon-choice-modal.component';
import { DragonBattleComponent } from './components/dragon-battle/dragon-battle.component';
import { DragonDetailsComponent } from './components/dragon-details/dragon-details.component';
import { AbstractModalComponent } from '../common/components/abstract-modal/abstract-modal.component';
import { ConfirmModalComponent } from '../common/components/confirm-modal/confirm-modal.component';
import { TooltipDirective } from '../common/utils/tooltip.directive';
import { AuctionCreateComponent } from './components/auction-create/auction-create.component';
import { MailSendModalComponent } from './components/mail-send-modal/mail-send-modal.component';
import { TimerPipe } from '../common/utils/timer.pipe';
import { DragonEquipComponent } from './components/dragon-equip/dragon-equip.component';
import { DragonStatsComponent } from './components/dragon-stats/dragon-stats.component';

const COMPONENTS = [
  AbstractModalComponent,
  AuctionCreateComponent,
  NavigationBarComponent,
  LoadingIndicatorComponent,
  InputBaseComponent,
  ConfirmModalComponent,
  DragonPreviewComponent,
  DragonDetailsComponent,
  DragonChoiceModalComponent,
  DragonBattleComponent,
  ItemDisplayComponent,
  MailSendModalComponent,
  DragonEquipComponent,
  DragonStatsComponent,
];
const MODULES = [
  ReactiveFormsModule,
  ToastrModule.forRoot({
    positionClass :'toast-bottom-center'
  }),
  TranslateModule.forChild(),
  NgbModule,
];
const UTILS = [
  TooltipDirective,
  TimerPipe,
];
const CHILD_PROVIDERS = [
  ...(TranslateModule.forChild().providers ?? []),
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...UTILS,
  ],
  imports: [
    CommonModule,
    ...MODULES
  ],
  providers: [],
  exports: [
    MODULES,
    ...COMPONENTS,
    ...UTILS,
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
