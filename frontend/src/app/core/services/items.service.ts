import { Injectable } from "@angular/core";
import { AchievementDto, AuctionDto, ItemDto } from "src/app/client/api";
import { DisplayAchievement, DisplayAuction, DisplayItem } from "../definitions/items";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private readonly BASE_RARITY_PATH = 'enums.itemRarity';
  private readonly BASE_TYPE_PATH = 'enums.itemType';
  private readonly BASE_ITEM_IMG_PATH = 'assets/img/items';
  private readonly BASE_ACHIEVEMENT_IMG_PATH = 'assets/img/achievements';

  toDisplayItem(item: ItemDto): DisplayItem {
    const rarity = `${this.BASE_RARITY_PATH}.${item.rarity}`;
    const type = `${this.BASE_TYPE_PATH}.${item.type}`;
    const image = `${this.BASE_ITEM_IMG_PATH}/${item.uid}.png`;

    return {
      ...item,
      rarityName: rarity,
      typeName: type,
      image: image,
    };
  }

  toDisplayAuction(auction: AuctionDto): DisplayAuction {
    return {
      ...auction,
      displayItem: this.toDisplayItem(auction.item),
    };
  }

  toDisplayAchievement(achievement: AchievementDto): DisplayAchievement {
    let nameBase = achievement.uid;
    let cssClass = `achievement-${achievement.tier}`;

    const image = `${this.BASE_ACHIEVEMENT_IMG_PATH}/${nameBase}.svg`;

    return {
      ...achievement,
      image: image,
      cssClass: cssClass,
    }
  }
}
