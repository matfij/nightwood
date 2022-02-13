import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuctionController, AuctionDto, AuthUserDto, GetAuctionDto, ItemRarity, ItemType } from 'src/app/client/api';
import { RepositoryService } from 'src/app/common/services/repository.service';
import { UtilsService } from 'src/app/common/services/utils.service';

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

  currentPage: number = 0;
  pageLimit: number = 9;
  canGetPrev: boolean = false;
  canGetNext: boolean = true;

  constructor(
    private auctionController: AuctionController,
    private repositoryService: RepositoryService,
    private utilsService: UtilsService,
  ) {}

  ItemType = ItemType;
  ItemRarity = ItemRarity;

  ngOnInit(): void {
    this.user = this.repositoryService.getUserData();
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

  buyAuction(id: number) {

  }

  cancelAuction(id: number) {

  }

}
