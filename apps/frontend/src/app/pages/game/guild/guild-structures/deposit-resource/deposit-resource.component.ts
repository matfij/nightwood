import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormInputOptions } from '../../../../../common/definitions/forms';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { ActionGuildController } from '../../../../../client/api';
import {
    GUILD_MAX_DEPOSIT_AMOUNT,
    GUILD_MIN_DEPOSIT_AMOUNT,
} from '../../../../../client/config/frontend.config';
import { ToastService } from '../../../../../common/services/toast.service';

@Component({
    selector: 'app-deposit-resource',
    templateUrl: './deposit-resource.component.html',
    styleUrls: ['./deposit-resource.component.scss'],
})
export class DepositResourceComponent {
    @Input() guildId!: number;
    @Input() resourceType!: ResourceType;
    @Output() close = new EventEmitter<boolean>();
    @Output() depositedAmount = new EventEmitter<number>();

    depositResourceForm = new FormGroup({
        amount: new FormControl<string | null>(null, [
            Validators.required,
            Validators.min(GUILD_MIN_DEPOSIT_AMOUNT),
            Validators.max(GUILD_MAX_DEPOSIT_AMOUNT),
        ]),
    });
    depositResourceFormFields: FormInputOptions[] = [
        { form: this.depositResourceForm, key: 'amount', label: 'guild.amount', type: 'number' },
    ];
    depositResource$ = new Observable();
    depositResourceLoading$ = new BehaviorSubject(false);

    ResourceType = ResourceType;

    constructor(private toastService: ToastService, private actionGuildController: ActionGuildController) {
        console.log(this.resourceType, ResourceType.Gold);
    }

    onSubmit() {
        if (!this.depositResourceForm.valid || !this.guildId) {
            return;
        }
        const depositAmount = parseInt(this.depositResourceForm.value.amount || '0');
        this.depositResourceLoading$.next(true);
        this.depositResource$ = this.actionGuildController
            .depositResource({
                eter: this.resourceType === ResourceType.Eter ? depositAmount : 0,
                gold: this.resourceType === ResourceType.Gold ? depositAmount : 0,
                guildId: this.guildId,
            })
            .pipe(
                tap(() => {
                    this.toastService.showSuccess('common.success', 'guild.resourceDeposited');
                    this.depositResourceForm.reset();
                    this.depositedAmount.next(depositAmount);
                }),
                catchError((err) => {
                    this.depositResourceLoading$?.next(false);
                    throw err;
                }),
            );
    }

    onClose() {
        this.close.next(true);
    }
}

export enum ResourceType {
    Gold = 'Gold',
    Eter = 'Eter',
}
