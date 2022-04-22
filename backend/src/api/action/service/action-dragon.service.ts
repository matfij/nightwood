import { Injectable } from "@nestjs/common";
import { DragonAdoptDto } from "src/api/dragons/dragon/model/dto/dragon-adopt.dto";
import { DragonDto } from "src/api/dragons/dragon/model/dto/dragon.dto";
import { DragonFeedDto } from "src/api/dragons/dragon/model/dto/dragon-feed.dto";
import { DragonService } from "src/api/dragons/dragon/service/dragon.service";
import { ItemService } from "src/api/items/item/service/item.service";
import { UserService } from "src/api/users/user/service/user.service";
import { DragonEquipDto } from "src/api/dragons/dragon/model/dto/dragon-equip.dto";
import { ErrorService } from "src/common/services/error.service";
import { MAX_RUNES } from "src/configuration/backend.config";
import { Item } from "src/api/items/item/model/item.entity";
import { DragonChangeNatureDto, DragonRenameDto } from "src/api/dragons/dragon/model/dto/dragon-tamer-params.dto";
import { DRAGON_NAME_MAX_LENGTH, DRAGON_NAME_MIN_LENGTH } from "src/configuration/frontend.config";
import { ACTION_CHANGE_NATURE, ACTION_RENAME, ACTION_RESET_SKILLS, ACTION_RESTORE_STAMINA } from "src/api/dragons/dragon/data/dragon-tamer-actions";
import { TRANSMUTATION_STONE } from "src/api/items/item/model/data/ingredients";
import { SHARD_UNITY } from "src/api/items/item/model/data/runes";

@Injectable()
export class ActionDragonService {

    constructor(
        private userService: UserService,
        private dragonService: DragonService,
        private itemService: ItemService,
        private errorService: ErrorService,
    ) {}

    async adoptDragon(userId: number, dto: DragonAdoptDto): Promise<DragonDto> {
        await this.userService.updateOwnedDragons(userId, true);
        
        const dragon = await this.dragonService.adopt(userId, dto);

        return dragon;
    }

    async feedDragon(userId: number, dto: DragonFeedDto): Promise<DragonDto> {
        const item = await this.itemService.checkFeedingItem(userId, dto.itemId);
        const dragon = await this.dragonService.checkFeedingDragon(userId, dto.dragonId);

        await this.itemService.consumeItem(item);
        const fedDragon = await this.dragonService.feedDragon(item, dragon);

        return fedDragon;
    }

    async releaseDragon(userId: number, dragonId: number): Promise<void> {
        await this.dragonService.releaseDragon(userId, dragonId);

        await this.userService.updateOwnedDragons(userId, false);
    }

    async equipDragon(userId: number, dto: DragonEquipDto): Promise<DragonDto> {
        const dragon = await this.dragonService.checkDragon(userId, dto.dragonId);
        const item = await this.itemService.checkEquippingItem(userId, dto.itemId) as Item;
        item.user = undefined;

        if (dragon.level < item.level) this.errorService.throw('errors.dragonTooYoung');
        if (dragon.runes.length >= MAX_RUNES) this.errorService.throw('errors.itemCanNotBeEquipped');

        await this.itemService.equipItem(item, dragon);

        return dragon;
    }

    async unequipDragon(userId: number, dto: DragonEquipDto): Promise<DragonDto> {
        const dragon = await this.dragonService.checkDragon(userId, dto.dragonId);
        const item = await this.itemService.checkUnequippingItem(userId, dto.itemId) as Item;

        if (item.dragon.id !== dragon.id) this.errorService.throw('errors.itemNotEquipped');

        await this.itemService.unquipItem(item);

        return dragon;
    }

    async renameDragon(userId: number, dto: DragonRenameDto): Promise<DragonDto> {
        const dragon = await this.dragonService.checkDragon(userId, dto.dragonId);
        const actionCost = dragon.level * ACTION_RENAME.costFactor;

        if (dragon.level < ACTION_RENAME.requiredLevel) this.errorService.throw('errors.dragonTooYoung');
        if (dto.newName.length > DRAGON_NAME_MAX_LENGTH || dto.newName.length < DRAGON_NAME_MIN_LENGTH) this.errorService.throw('errors.incorrectDragonName');
        if (!this.errorService.checkBannedWords(dto.newName)) this.errorService.throw('errors.incorrectDragonName');

        await this.userService.updateGold(userId, -actionCost);
        return await this.dragonService.changeName(dragon, dto.newName);
    }

    async resetDragonSkills(userId: number, dragonId: number): Promise<DragonDto> {
        const dragon = await this.dragonService.checkDragon(userId, dragonId);
        const actionCost = dragon.level * ACTION_RESET_SKILLS.costFactor;

        if (dragon.level < ACTION_RENAME.requiredLevel) this.errorService.throw('errors.dragonTooYoung');
        
        await this.userService.updateGold(userId, -actionCost);
        return await this.dragonService.resetSkills(dragon);
    }

    async restoreDragonStamina(userId: number, dragonId: number): Promise<DragonDto> {
        const dragon = await this.dragonService.checkFeedingDragon(userId, dragonId);
        const actionCost = dragon.level * ACTION_RESTORE_STAMINA.costFactor;

        if (dragon.level < ACTION_RENAME.requiredLevel) this.errorService.throw('errors.dragonTooYoung');
        
        await this.userService.updateGold(userId, -actionCost);
        return await this.dragonService.restoreStamina(dragon);
    }
    
    async changeDragonNature(userId: number, dto: DragonChangeNatureDto): Promise<DragonDto> {
        const dragon = await this.dragonService.checkDragon(userId, dto.dragonId);
        const actionCost = dragon.level * ACTION_CHANGE_NATURE.costFactor;

        if (dragon.level < ACTION_RENAME.requiredLevel) this.errorService.throw('errors.dragonTooYoung');
        if (dto.newNature === dragon.nature) this.errorService.throw('errors.dragonAlreadyHasThisNature')

        // foreach item in requiredItems, synchronous
        await this.itemService.checkAndConsumeItem(SHARD_UNITY.uid, userId);

        await this.userService.updateGold(userId, -actionCost);
        return await this.dragonService.changeNature(dragon, dto.newNature);
    }
}
