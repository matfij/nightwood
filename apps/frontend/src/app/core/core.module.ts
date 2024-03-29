import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { LoadingIndicatorComponent } from '../common/components/loading-indicator/loading-indicator.component';
import { InputBaseComponent } from '../common/components/input-base/input-base.component';
import { NavigationBarComponent } from '../common/components/navigation-bar/navigation-bar.component';
import { DragonPreviewComponent } from './components/dragon-card/dragon-card.component';
import { ItemDisplayComponent } from './components/item-display/item-display.component';
import { DragonChoiceModalComponent } from './components/dragon-choice-modal/dragon-choice-modal.component';
import { DragonBattleComponent } from './components/dragon-battle/dragon-battle.component';
import { DragonSkillsComponent } from './components/dragon-skills/dragon-skills.component';
import { AbstractModalComponent } from '../common/components/abstract-modal/abstract-modal.component';
import { ConfirmModalComponent } from '../common/components/confirm-modal/confirm-modal.component';
import { TooltipDirective } from '../common/utils/tooltip.directive';
import { AuctionCreateComponent } from './components/auction-create/auction-create.component';
import { MailSendModalComponent } from './components/mail-send-modal/mail-send-modal.component';
import { TimerPipe } from '../common/utils/timer.pipe';
import { DragonEquipComponent } from './components/dragon-equip/dragon-equip.component';
import { DragonStatsComponent } from './components/dragon-stats/dragon-stats.component';
import { UserFriendRequestsComponent } from './components/user-friend-requests/user-friend-requests.component';
import { ShoutboxPenaltyModalComponent } from './components/shoutbox-penalty-modal/shoutbox-penalty-modal.component';
import { CraftingItemListComponent } from './components/crafting-item-list/crafting-item-list.component';
import { ShortNumberPipe } from '../common/utils/short-number.pipe';
import { AlchemyMixturesComponent } from './components/alchemy-mixtures/alchemy-mixtures.component';
import { AlchemyBoostersComponent } from './components/alchemy-boosters/alchemy-boosters.component';
import { DragonFeedComponent } from './components/dragon-feed/dragon-feed.component';
import { ForgotPasswordComponent } from '../common/components/forgot-password/forgot-password.component';
import { SpreadNumberPipe } from '../common/utils/spread-number.pipe';

const COMPONENTS = [
  AbstractModalComponent,
  AuctionCreateComponent,
  NavigationBarComponent,
  LoadingIndicatorComponent,
  InputBaseComponent,
  ConfirmModalComponent,
  DragonPreviewComponent,
  DragonSkillsComponent,
  DragonChoiceModalComponent,
  DragonBattleComponent,
  ItemDisplayComponent,
  MailSendModalComponent,
  DragonEquipComponent,
  DragonFeedComponent,
  DragonStatsComponent,
  UserFriendRequestsComponent,
  ShoutboxPenaltyModalComponent,
  CraftingItemListComponent,
  AlchemyMixturesComponent,
  AlchemyBoostersComponent,
  ForgotPasswordComponent,
];
const MODULES = [
  ReactiveFormsModule,
  ToastrModule.forRoot({
    positionClass :'toast-bottom-center'
  }),
  TranslateModule.forChild(),
];
const UTILS = [
  TooltipDirective,
  TimerPipe,
  ShortNumberPipe,
  SpreadNumberPipe,
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
