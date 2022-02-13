import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuctionController, AuctionDto, GetAuctionDto, PageAuctionDto } from 'src/app/client/api';
import { DisplayAuction } from 'src/app/core/definitions/items';
import { ItemsService } from 'src/app/core/services/items.service';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.scss']
})
export class AuctionsComponent implements OnInit {

  auctions: AuctionDto[] = [];
  auctionsLoading: boolean = false;
  canGetPrev: boolean = false;
  canGetNext: boolean = true;
  displayCreateForm: boolean = false;

  constructor(
    private auctionController: AuctionController,
    private itemService: ItemsService,
  ) {}

  ngOnInit(): void {
    this.getAuctions();
  }

  getAuctions(next?: boolean, minLevel?: number, maxLevel?: number) {
    const params: GetAuctionDto = {

    };
    this.auctionsLoading = true;
    this.auctionController.getAll(params).subscribe(auctionPage => {
      this.auctionsLoading = false;
      this.auctions = auctionPage.data;
    }, () => this.auctionsLoading = false);
  }

  createAuction() {

  }

  buyAuction(id: number) {

  }

}
