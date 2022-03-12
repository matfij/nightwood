import { AuctionDto, ItemDto } from "src/app/client/api";

export interface DisplayItem extends ItemDto {
  rarityName: string;
  typeName: string;
  image: string;
}

export interface DisplayAuction extends AuctionDto {
  displayItem: DisplayItem;
}
