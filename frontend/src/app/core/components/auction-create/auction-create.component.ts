import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AuctionController, AuctionCreateDto, ItemController, PageItemDto } from 'src/app/client/api';
import { AUCTION_MAX_DURATION, AUCTION_MAX_PRICE, AUCTION_MAX_QUANTITY, AUCTION_MIN_DURATION, AUCTION_MIN_PRICE, AUCTION_MIN_QUANTITY } from 'src/app/client/frontend.config';
import { FormInputOptions } from 'src/app/common/definitions/forms';
import { ToastService } from 'src/app/common/services/toast.service';
import { AbstractModalComponent } from '../../../common/components/abstract-modal/abstract-modal.component';

@Component({
  selector: 'app-auction-create',
  templateUrl: './auction-create.component.html',
  styleUrls: [
    '../../../common/components/abstract-modal/abstract-modal.component.scss',
    './auction-create.component.scss',
  ]
})
export class AuctionCreateComponent extends AbstractModalComponent implements OnInit {

  @ViewChild('itemSelect') itemSelect!: ElementRef;

  form: FormGroup = new FormGroup({
    duration: new FormControl(
      null, [Validators.required, Validators.min(AUCTION_MIN_DURATION), Validators.max(AUCTION_MAX_DURATION)],
    ),
    quantity: new FormControl(
      null, [Validators.required, Validators.min(AUCTION_MIN_QUANTITY), Validators.max(AUCTION_MAX_QUANTITY)],
    ),
    unitPrice: new FormControl(
      null, [Validators.required, Validators.min(AUCTION_MIN_PRICE), Validators.max(AUCTION_MAX_PRICE)],
    ),
  });
  fields: FormInputOptions[] = [
    { form: this.form, key: 'duration', label: 'auctions.duration', type: 'number' },
    { form: this.form, key: 'quantity', label: 'auctions.quantity', type: 'number' },
    { form: this.form, key: 'unitPrice', label: 'auctions.unitPrice', type: 'number' },
  ];
  submitLoading: boolean = false;
  tradableItems$?: Observable<PageItemDto>;

  get duration(): FormControl { return this.form.get('duration') as FormControl; }
  get quantity(): FormControl { return this.form.get('quantity') as FormControl; }
  get unitPrice(): FormControl { return this.form.get('unitPrice') as FormControl; }

  constructor(
    private translateService: TranslateService,
    private auctionController: AuctionController,
    private itemController: ItemController,
    private toastService: ToastService,
  ) {
    super();

    const duration = this.fields.filter(field => field.key === 'duration')[0];
    const quantity = this.fields.filter(field => field.key === 'quantity')[0];
    const unitPrice = this.fields.filter(field => field.key === 'unitPrice')[0];

    duration.hint = this.translateService.instant('auctions.durationHint', { min: AUCTION_MAX_DURATION, max: AUCTION_MAX_DURATION });
    quantity.hint = this.translateService.instant('auctions.quantityHint', { min: AUCTION_MIN_QUANTITY, max: AUCTION_MAX_QUANTITY });
    unitPrice.hint = this.translateService.instant('auctions.priceHint', { min: AUCTION_MIN_PRICE, max: AUCTION_MAX_PRICE });
  }

  ngOnInit(): void {
    this.getTradableItems();
  }

  getTradableItems() {
    this.tradableItems$ = this.itemController.getOwnedFoods();
  }

  createAuction() {
    if (!this.form.valid) { this.toastService.showError('errors.formInvalid', 'errors.formInvalidHint'); return; }
    const selectedItem = this.itemSelect.nativeElement.value;

    const params: AuctionCreateDto = {
      itemId: selectedItem,
      duration: this.duration.value,
      quantity: this.quantity.value,
      unitGoldPrice: this.unitPrice.value,
    };
    this.submitLoading = true;
    this.auctionController.create(params).subscribe(() => {
      this.submitLoading = false;
      this.toastService.showSuccess('common.success', 'auctions.offerCreated');
      this.closeModal();
    }, () => this.submitLoading = false);
  }

}
