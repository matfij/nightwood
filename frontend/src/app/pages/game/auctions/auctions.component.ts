import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuctionController, GetAuctionDto, PageAuctionDto } from 'src/app/client/api';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.scss']
})
export class AuctionsComponent implements OnInit {

  auctions$?: Observable<PageAuctionDto>;

  constructor(
    private auctionController: AuctionController,
  ) {}

  ngOnInit(): void {
    this.getAuctions();
  }

  getAuctions() {
    const params: GetAuctionDto = {

    };
    this.auctions$ = this.auctionController.getAll(params);
  }

}
