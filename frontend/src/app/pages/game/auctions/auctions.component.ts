import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActionController, AuctionController, AuctionDto, AuthUserDto, GetAuctionDto, ItemRarity, ItemType } from 'src/app/client/api';
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

  user!: AuthUserDto;
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

  getAuctions(next?: boolean) {
    if (next) this.currentPage += 1;
    if (next === false) this.currentPage -= 1;
    if (this.currentPage < 0) this.currentPage = 0;

    const params: GetAuctionDto = {
      page: this.currentPage,
      limit: this.pageLimit,
      ownedByUser: this.displayOwned,
      name: this.searchName?.nativeElement.value,
      type: this.searchType?.nativeElement.value,
      requiredRarity: this.searchRarity?.nativeElement.value,
      minLevel: this.searchMinLevel?.nativeElement.value ? +this.searchMinLevel.nativeElement.value : 1,
      maxLevel: this.searchMaxLevel?.nativeElement.value ? +this.searchMaxLevel.nativeElement.value : 9999,
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
