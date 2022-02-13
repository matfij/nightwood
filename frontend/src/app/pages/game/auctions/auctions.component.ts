import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuctionController, AuctionDto, AuthUserDto, GetAuctionDto, PageAuctionDto, UserDto } from 'src/app/client/api';
import { RepositoryService } from 'src/app/common/services/repository.service';
import { DisplayAuction } from 'src/app/core/definitions/items';
import { ItemsService } from 'src/app/core/services/items.service';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.scss']
})
export class AuctionsComponent implements OnInit {

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
    private itemService: ItemsService,
    private repositoryService: RepositoryService,
  ) {}

  ngOnInit(): void {
    this.user = this.repositoryService.getUserData();
    this.getAuctions();
  }

  getAuctions(next?: boolean, minLevel?: number, maxLevel?: number) {
    if (next) this.currentPage += 1;
    if (next === false) this.currentPage -= 1;
    if (this.currentPage < 0) this.currentPage = 0;

    const params: GetAuctionDto = {
      page: this.currentPage,
      limit: this.pageLimit,
      ownedByUser: this.displayOwned,
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
