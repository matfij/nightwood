import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActionController, AuctionController, AuctionDto, UserAuthDto, AuctionGetDto, ItemRarity, ItemType } from 'src/app/client/api';
import { AUCTION_MAX_SEARCH_LEVEL, AUCTION_MAX_SEARCH_NAME_LENGTH, AUCTION_MIN_SEARCH_LEVEL, AUCTION_MIN_SEARCH_NAME_LENGTH } from 'src/app/client/config/frontend.config';
import { ToastService } from 'src/app/common/services/toast.service';
import { DisplayAuction } from 'src/app/core/definitions/items';
import { EngineService } from 'src/app/core/services/engine.service';
import { ItemsService } from 'src/app/core/services/items.service';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.scss'],
})
export class AuctionsComponent implements OnInit {

  @ViewChild('searchName') searchName?: ElementRef;
  @ViewChild('searchMinLevel') searchMinLevel?: ElementRef;
  @ViewChild('searchMaxLevel') searchMaxLevel?: ElementRef;
  @ViewChild('searchRarity') searchRarity?: ElementRef;
  @ViewChild('searchType') searchType?: ElementRef;

  user!: UserAuthDto;
  auctions: AuctionDto[] = [];
  auctionsLoading: boolean = false;
  displayOwned: boolean = false;
  displayCreateForm: boolean = false;
  selectedAuction?: DisplayAuction;
  displayBuyAuctionModal: boolean = false;

  currentPage: number = 0;
  pageLimit: number = 9;
  canGetPrev: boolean = false;
  canGetNext: boolean = true;

  constructor(
    private actionController: ActionController,
    private auctionController: AuctionController,
    private engineService: EngineService,
    private toastService: ToastService,
    private itemsService: ItemsService,
  ) {}

  ItemType = ItemType;
  ItemRarity = ItemRarity;

  ngOnInit(): void {
    this.user = this.engineService.user;
    this.getAuctions();
  }

  validateSearchParams(): boolean {
    const searchName = this.searchName?.nativeElement.value;
    if (searchName) {
      if (searchName.length < AUCTION_MIN_SEARCH_NAME_LENGTH) return false;
      if (searchName.length > AUCTION_MAX_SEARCH_NAME_LENGTH) return false;
    }
    const searchMinLevel = +this.searchMinLevel?.nativeElement.value;
    if (searchMinLevel) {
      if (searchMinLevel < AUCTION_MIN_SEARCH_LEVEL) return false;
      if (searchMinLevel > AUCTION_MAX_SEARCH_LEVEL) return false;
    }
    const searchMaxLevel = +this.searchMaxLevel?.nativeElement.value;
    if (searchMaxLevel) {
      if (searchMaxLevel < AUCTION_MIN_SEARCH_LEVEL) return false;
      if (searchMaxLevel > AUCTION_MAX_SEARCH_LEVEL) return false;
    }
    if (searchMinLevel && searchMaxLevel && searchMinLevel > searchMaxLevel) return false

    return true;
  }

  getAuctions(next?: boolean) {
    if (!this.validateSearchParams()) { this.toastService.showError('errors.formInvalid', 'errors.formInvalidHint'); return; }

    if (next) this.currentPage += 1;
    if (next === false) this.currentPage -= 1;
    if (this.currentPage < 0) this.currentPage = 0;

    const params: AuctionGetDto = {
      page: this.currentPage,
      limit: this.pageLimit,
      ownedByUser: this.displayOwned,
      name: this.searchName?.nativeElement.value,
      type: this.searchType?.nativeElement.value ?? undefined,
      requiredRarity: this.searchRarity?.nativeElement.value ?? undefined,
      minLevel: this.searchMinLevel?.nativeElement.value ? Math.floor(+this.searchMinLevel.nativeElement.value) : AUCTION_MIN_SEARCH_LEVEL,
      maxLevel: this.searchMaxLevel?.nativeElement.value ? Math.floor(+this.searchMaxLevel.nativeElement.value) : AUCTION_MAX_SEARCH_LEVEL,
    };
    this.auctionsLoading = true;
    this.auctionController.getAll(params).subscribe(auctionPage => {
      this.auctionsLoading = false;
      if (this.displayOwned) this.auctions = auctionPage.data.filter(auction => auction.sellerId === this.user.id);
      else this.auctions = auctionPage.data;

      this.canGetPrev = this.currentPage !== 0;
      this.canGetNext = (this.currentPage + 1) * this.pageLimit <= auctionPage.meta.totalItems!;
    }, () => this.auctionsLoading = false);
  }

  changeMode(owned: boolean) {
    this.displayOwned = owned;
    this.currentPage = 0;
    this.getAuctions();
  }

  confirmBuyAuction(auction: AuctionDto) {
    this.selectedAuction = this.itemsService.toDisplayAuction(auction);
    this.displayBuyAuctionModal = true;
  }

  buyAuction(id: number) {
    this.displayBuyAuctionModal = false;
    this.auctionsLoading = true;
    this.actionController.buyAuction(id.toString()).subscribe(buyAuctionResult => {
      this.auctionsLoading = false;
      this.toastService.showSuccess('common.success', 'auctions.purchaseCompleted');

      this.user.gold = this.user.gold - buyAuctionResult.consumedGold;
      this.engineService.updateUser({ gold: this.user.gold });
      this.getAuctions();
    }, () => this.auctionsLoading = false);
  }

  cancelAuction(id: number) {
    this.auctionsLoading = true;
    this.auctionController.cancel(id.toString()).subscribe(() => {
      this.auctionsLoading = false;
      this.toastService.showSuccess('common.success', 'auctions.offerCancelled');

      this.getAuctions();
    }, () => this.auctionsLoading = false);
  }

}
