import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import {
    AuctionController,
    AuctionCreateDto,
    AuctionDto,
    ItemController,
    ItemPageDto,
} from 'src/app/client/api';
import {
    AUCTION_MAX_DURATION,
    AUCTION_MAX_PRICE,
    AUCTION_MAX_QUANTITY,
    AUCTION_MIN_DURATION,
    AUCTION_MIN_PRICE,
    AUCTION_MIN_QUANTITY,
} from 'src/app/client/config/frontend.config';
import { FieldType, FormInputOptions } from 'src/app/common/definitions/forms';
import { ToastService } from 'src/app/common/services/toast.service';
import { AbstractModalComponent } from '../../../common/components/abstract-modal/abstract-modal.component';

@Component({
    selector: 'app-auction-create',
    templateUrl: './auction-create.component.html',
    styleUrls: [
        '../../../common/components/abstract-modal/abstract-modal.component.scss',
        './auction-create.component.scss',
    ],
})
export class AuctionCreateComponent extends AbstractModalComponent implements OnInit {
    @ViewChild('itemSelect') itemSelect!: ElementRef;

    form = new FormGroup({
        duration: new FormControl<number | null>(AUCTION_MAX_DURATION, [
            Validators.required,
            Validators.min(AUCTION_MIN_DURATION),
            Validators.max(AUCTION_MAX_DURATION),
        ]),
        quantity: new FormControl<number | null>(AUCTION_MIN_QUANTITY, [
            Validators.required,
            Validators.min(AUCTION_MIN_QUANTITY),
            Validators.max(AUCTION_MAX_QUANTITY),
        ]),
        unitPrice: new FormControl<number | null>(null, [
            Validators.required,
            Validators.min(AUCTION_MIN_PRICE),
            Validators.max(AUCTION_MAX_PRICE),
        ]),
    });
    fields: FormInputOptions[] = [
        { form: this.form, key: 'duration', label: 'auctions.duration', fieldType: FieldType.INTEGER },
        { form: this.form, key: 'quantity', label: 'auctions.quantity', fieldType: FieldType.INTEGER },
        { form: this.form, key: 'unitPrice', label: 'auctions.unitPrice', fieldType: FieldType.INTEGER },
    ];
    tradableItems$?: Observable<ItemPageDto>;
    createAuction$?: Observable<AuctionDto>;
    createAuctionLoading$ = new BehaviorSubject(false);

    constructor(
        private translateService: TranslateService,
        private auctionController: AuctionController,
        private itemController: ItemController,
        private toastService: ToastService,
    ) {
        super();

        const duration = this.fields.filter((field) => field.key === 'duration')[0];
        const quantity = this.fields.filter((field) => field.key === 'quantity')[0];
        const unitPrice = this.fields.filter((field) => field.key === 'unitPrice')[0];

        duration.hint = this.translateService.instant('auctions.durationHint', {
            min: AUCTION_MIN_DURATION,
            max: AUCTION_MAX_DURATION,
        });
        quantity.hint = this.translateService.instant('auctions.quantityHint', {
            min: AUCTION_MIN_QUANTITY,
            max: AUCTION_MAX_QUANTITY,
        });
        unitPrice.hint = this.translateService.instant('auctions.priceHint', {
            min: AUCTION_MIN_PRICE,
            max: AUCTION_MAX_PRICE,
        });
    }

    ngOnInit(): void {
        this.getTradableItems();
    }

    getTradableItems() {
        this.tradableItems$ = this.itemController.getOwnedItems();
    }

    createAuction() {
        if (
            !this.form.value.duration ||
            !this.form.value.quantity ||
            !this.form.value.unitPrice ||
            !this.form.valid
        ) {
            this.toastService.showError('errors.formInvalid', 'errors.formInvalidHint');
            return;
        }
        const params: AuctionCreateDto = {
            itemId: this.itemSelect.nativeElement.value,
            duration: this.form.value.duration,
            quantity: this.form.value.quantity,
            unitGoldPrice: this.form.value.unitPrice,
        };
        this.createAuctionLoading$.next(true);
        this.createAuction$ = this.auctionController.create(params).pipe(
            tap(() => {
                this.createAuctionLoading$.next(false);
                this.toastService.showSuccess('common.success', 'auctions.offerCreated');
                this.closeModal();
            }),
            catchError((err) => {
                this.createAuctionLoading$.next(false);
                throw err;
            }),
        );
    }
}
