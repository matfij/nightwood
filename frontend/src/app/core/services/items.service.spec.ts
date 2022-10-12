import { TestBed } from '@angular/core/testing';
import { AchievementDto, AuctionDto, ItemDto, ItemRarity, ItemType } from 'src/app/client/api';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;
  const item: ItemDto = {
    level: 0,
    name: 'testitem',
    rarity: ItemRarity.Common,
    statistics: {} as any,
    type: ItemType.Booster,
    uid: 'i-01',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
    });
    service = TestBed.inject(ItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map item to display item', () => {
    const displayItem = service.toDisplayItem(item);

    expect(displayItem.name).toBe(item.name);
    expect(displayItem.level).toBe(item.level);
    expect(displayItem.rarityName).toBe('enums.itemRarity.Common');
    expect(displayItem.typeName).toBe('enums.itemType.Booster');
    expect(displayItem.image).toBe(`assets/img/items/${item.uid}.png`);
  });

  it('should map auction to display auction', () => {
    const auction: AuctionDto = {
      active: true,
      endTime: Date.now() + 1 * 60 * 60 * 1000,
      finalized: false,
      id: 0,
      item: item,
      quantity: 1,
      sellerId: 0,
      totalGoldPrice: 1000,
    }

    const displayAuciton = service.toDisplayAuction(auction);

    expect(displayAuciton.totalGoldPrice).toBe(auction.totalGoldPrice);
    expect(displayAuciton.displayItem.image).toBe(`assets/img/items/${auction.item.uid}.png`);
  });

  it('should map achievement to display achievement', () => {
    const achievement: AchievementDto = {
      hint: 'how to obtain',
      name: 'collector',
      tier: 1,
      uid: 'a-01'
    };

    const displayAchievement = service.toDisplayAchievement(achievement);

    expect(displayAchievement.name).toBe(achievement.name);
    expect(displayAchievement.cssClass).toBe('achievement-1');
    expect(displayAchievement.image).toBe(`assets/img/achievements/${achievement.uid}.svg`);
  });
});
