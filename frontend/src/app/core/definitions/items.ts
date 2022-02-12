import { AuctionDto, ItemDto } from "src/app/client/api";

export interface DisplayItem extends ItemDto {
  displayName: string;
  rarityName: string;
  typeName: string;
  image: string;
}

export interface DisplayAuction extends AuctionDto {
  displayItem: DisplayItem;
}
