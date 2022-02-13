import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AuctionController, CreateAuctionDto, ItemController, PageItemDto } from 'src/app/client/api';
import { FormInputOptions } from 'src/app/common/definitions/forms';
import { ToastService } from 'src/app/common/services/toast.service';
import { MAX_AUCTION_DURATION, MAX_AUCTION_PRICE, MAX_AUCTION_QUANTITY, MIN_AUCTION_DURATION, MIN_AUCTION_PRICE, MIN_AUCTION_QUANTITY } from '../../configuration';
import { AbstractModalComponent } from '../abstract-modal/abstract-modal.component';

@Component({
  selector: 'app-auction-create',
  templateUrl: './auction-create.component.html',
  styleUrls: [
    './auction-create.component.scss',
    '../abstract-modal/abstract-modal.component.scss',
  ]
})
export class AuctionCreateComponent extends AbstractModalComponent implements OnInit {

  @ViewChild('itemSelect') itemSelect!: ElementRef;

  form: FormGroup = new FormGroup({
    duration: new FormControl(
      null,
      [Validators.required, Validators.min(MIN_AUCTION_DURATION), Validators.max(MAX_AUCTION_DURATION)],
    ),
    quantity: new FormControl(
      null,
      [Validators.required, Validators.min(MIN_AUCTION_QUANTITY), Validators.max(MAX_AUCTION_QUANTITY)],
    ),
    unitPrice: new FormControl(
      null,
      [Validators.required, Validators.min(MIN_AUCTION_PRICE), Validators.max(MAX_AUCTION_PRICE)],
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

    duration.hint = this.translateService.instant('auctions.durationHint', { min: MIN_AUCTION_DURATION, max: MAX_AUCTION_DURATION });
    quantity.hint = this.translateService.instant('auctions.quantityHint', { min: MIN_AUCTION_QUANTITY, max: MAX_AUCTION_QUANTITY });
    unitPrice.hint = this.translateService.instant('auctions.priceHint', { min: MIN_AUCTION_PRICE, max: MAX_AUCTION_PRICE });
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

    console.log('data', selectedItem, this.duration.value, this.quantity.value, this.unitPrice.value)
    const params: CreateAuctionDto = {
      itemId: selectedItem,
      duration: this.duration.value,
      quantity: this.quantity.value,
      unitGoldPrice: this.unitPrice.value,
    };
    this.submitLoading = true;
    this.auctionController.create(params).subscribe(auction => {
      this.submitLoading = false;
      this.toastService.showSuccess('common.success', 'auctions.offerCreated');
      this.closeModal();
    }, () => this.submitLoading = false);
  }

}
