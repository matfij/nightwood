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
import { ACTION_ASCENT_DRAGON_POWER, ACTION_CHANGE_NATURE, ACTION_RENAME, ACTION_RESET_SKILLS, ACTION_RESTORE_STAMINA } from "src/api/dragons/dragon/data/dragon-tamer-actions";
import { DragonSummonDto } from "src/api/dragons/dragon/model/dto/dragon-summon.dto";
import { DRAGON_SUMMON_ACTIONS } from "src/api/dragons/dragon/data/dragon-summon-actions";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { BoosterActivateDto } from "src/api/items/alchemy/model/dto/booster-activate.dto";
import { AlchemyService } from "src/api/items/alchemy/service/alchemy.service";
import { BOOSTER_RECIPES } from "src/api/items/alchemy/data/booster-recipe";
import { AchievementsService } from "src/api/users/achievements/service/achievements.service";
import { DragonNature } from "src/api/dragons/dragon/model/definitions/dragons";
import { GuildService } from "../../guilds/guild/service/guild.service";
import { TENACITY_TOWER_UPGRADES } from "../../guilds/guild/data/structure-upgrades";

@Injectable()
export class ActionDragonService {

    constructor(
        private achievementsService: AchievementsService,
        private userService: UserService,
        private dragonService: DragonService,
        private itemService: ItemService,
        private alchemyService: AlchemyService,
        private guildService: GuildService,
        private errorService: ErrorService,
    ) {}

    async checkAllAchievements(): Promise<void> {
        const users = await this.userService.getAll({
            page: 1,
            limit: 1000,
        });
        for (const user of users.data) {
            const dragons = await this.dragonService.getOwnedDragons(user.id);
            if (dragons.length > 0) {
                const oldestDragon = dragons.reduce((prev, current) => (prev.level > current.level) ? prev : current);
                const mostExperiencedDragon = dragons.reduce((prev, current) => (prev.experience > current.experience) ? prev : current);
                this.achievementsService.checkAllAchievements(user.id, oldestDragon, mostExperiencedDragon);
            }
        }
    }

    async adoptDragon(userId: number, dto: DragonAdoptDto): Promise<DragonDto> {
        const user = await this.userService.getOne(userId);
        await this.userService.updateOwnedDragons(userId, true);
        
        const dragon = await this.dragonService.adopt(user, dto);

        this.achievementsService.checkDragonOwnerAchievements(userId);

        return dragon;
    }

    async summonDragon(userId: number, dto: DragonSummonDto): Promise<DragonDto> {
        const action = DRAGON_SUMMON_ACTIONS.find(action => action.uid === dto.actionUid);
        if (!action) this.errorService.throw('errors.actionNotFound');

        const user = await this.userService.getOne(userId);
        if (user.gold < action.cost) this.errorService.throw('errors.insufficientsFound');
        if (user.ownedDragons >= user.maxOwnedDragons) this.errorService.throw('errors.maxDragonsExceeded');

        if (dto.name.length < DRAGON_NAME_MIN_LENGTH || dto.name.length > DRAGON_NAME_MAX_LENGTH) this.errorService.throw('errors.incorrectDragonName');
        if (!this.errorService.isPhareClear(dto.name)) this.errorService.throw('errors.bannedWordUse');

        await this.itemService.checkAndConsumeItems(action.requiredItems, userId);
        await this.userService.updateOwnedDragons(userId, true);
        await this.userService.updateGold(userId, -action.cost);
        
        const dragon = await this.dragonService.adopt(user, dto);

        this.achievementsService.checkDragonOwnerAchievements(userId);

        return dragon;
    }

    async feedDragon(userId: number, dto: DragonFeedDto): Promise<DragonDto> {
        const user = await this.userService.getOne(userId);
        const item = await this.itemService.checkFeedingItem(userId, dto.itemId);
        const dragon = await this.dragonService.checkFeedingDragon(userId, dto.dragonId);

        const guild = user.guildId ? await this.guildService.getOne(user.guildId) : null;
        const extraStaminaGain = TENACITY_TOWER_UPGRADES[guild?.tenacityTowerLevel || 0].utility;
        
        await this.itemService.consumeItem(item);
        const fedDragon = await this.dragonService.feedDragon(item, dragon, extraStaminaGain);

        this.achievementsService.checkPersistentBreederAchievements(userId, fedDragon);
        
        return fedDragon;
    }
    
    async activateBooster(user: UserDto, dto: BoosterActivateDto): Promise<void> {
        const boosterRecipe = BOOSTER_RECIPES.find(booster => booster.uid === dto.boosterRecipeUid);
        if (!boosterRecipe) this.errorService.throw('errors.boosterNotFound');
        
        const dragon = await this.dragonService.checkDragon(user.id, dto.dragonId);
        if (dragon.level < boosterRecipe.product.level) this.errorService.throw('errors.dragonTooYoung');

        const booster = await this.alchemyService.composeBooster(user, boosterRecipe);

        await this.dragonService.activateBooster(dragon, booster);
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

        if (!item.dragon || item.dragon.id !== dragon.id) this.errorService.throw('errors.itemNotEquipped');

        await this.itemService.unquipItem(item);

        return dragon;
    }

    async renameDragon(userId: number, dto: DragonRenameDto): Promise<DragonDto> {
        const dragon = await this.dragonService.checkDragon(userId, dto.dragonId);
        const actionCost = ACTION_RENAME.baseCost + dragon.level * ACTION_RENAME.costFactor;

        if (dragon.level < ACTION_RENAME.requiredLevel) this.errorService.throw('errors.dragonTooYoung');
        if (dto.newName.length > DRAGON_NAME_MAX_LENGTH || dto.newName.length < DRAGON_NAME_MIN_LENGTH) this.errorService.throw('errors.incorrectDragonName');
        if (!this.errorService.isPhareClear(dto.newName)) this.errorService.throw('errors.incorrectDragonName');

        await this.userService.updateGold(userId, -actionCost);
        return await this.dragonService.changeName(dragon, dto.newName);
    }

    async resetDragonSkills(userId: number, dragonId: number): Promise<DragonDto> {
        const dragon = await this.dragonService.checkDragon(userId, dragonId);
        const actionCost = ACTION_RESET_SKILLS.baseCost + dragon.level * ACTION_RESET_SKILLS.costFactor;
        const user = await this.userService.getOne(userId);

        if (dragon.level < ACTION_RENAME.requiredLevel) this.errorService.throw('errors.dragonTooYoung');
        if (user.gold < actionCost) this.errorService.throw('errors.insufficientsFound');
        
        await this.itemService.checkAndConsumeItems(ACTION_RESET_SKILLS.requiredItems, userId);
        await this.userService.updateGold(userId, -actionCost);
        return await this.dragonService.resetSkills(dragon);
    }

    async restoreDragonStamina(userId: number, dragonId: number): Promise<DragonDto> {
        const user = await this.userService.getOne(userId);
        const dragon = await this.dragonService.checkFeedingDragon(userId, dragonId);
        const actionCost = ACTION_RESTORE_STAMINA.baseCost + dragon.level * ACTION_RESTORE_STAMINA.costFactor;

        const guild = user.guildId ? await this.guildService.getOne(user.guildId) : null;
        const extraStaminaGain = TENACITY_TOWER_UPGRADES[guild?.tenacityTowerLevel || 0].utility;

        if (dragon.level < ACTION_RENAME.requiredLevel) {
            this.errorService.throw('errors.dragonTooYoung');
        }
        if (user.gold < actionCost) {
            this.errorService.throw('errors.insufficientsFound');
        }
        
        await this.itemService.checkAndConsumeItems(ACTION_RESTORE_STAMINA.requiredItems, userId);
        await this.userService.updateGold(userId, -actionCost);
        return await this.dragonService.restoreStamina(dragon, extraStaminaGain);
    }
    
    async changeDragonNature(userId: number, dto: DragonChangeNatureDto): Promise<DragonDto> {
        const dragon = await this.dragonService.checkDragon(userId, dto.dragonId);
        const actionCost = ACTION_CHANGE_NATURE.baseCost + dragon.level * ACTION_CHANGE_NATURE.costFactor;

        if (dragon.level < ACTION_RENAME.requiredLevel) this.errorService.throw('errors.dragonTooYoung');
        if (dto.newNature === dragon.nature) this.errorService.throw('errors.dragonAlreadyHasThisNature');

        const user = await this.userService.getOne(userId);
        if (user.gold < actionCost) this.errorService.throw('errors.insufficientsFound');

        await this.itemService.checkAndConsumeItems(ACTION_CHANGE_NATURE.requiredItems, userId);

        await this.userService.updateGold(userId, -actionCost);
        return await this.dragonService.changeNature(dragon, dto.newNature);
    }

    async ascentDragonPower(userId: number, dragonId: number): Promise<DragonDto> {
        const dragon = await this.dragonService.checkDragon(userId, dragonId);
        const actionCost = ACTION_ASCENT_DRAGON_POWER.baseCost + dragon.level * ACTION_ASCENT_DRAGON_POWER.costFactor;

        if (dragon.experience < ACTION_ASCENT_DRAGON_POWER.requiredExperience) this.errorService.throw('errors.dragonNotExperiencedEnough');
        if (DragonNature.Power === dragon.nature) this.errorService.throw('errors.dragonAlreadyHasThisNature');

        const user = await this.userService.getOne(userId);
        if (user.gold < actionCost) this.errorService.throw('errors.insufficientsFound');

        await this.itemService.checkAndConsumeItems(ACTION_ASCENT_DRAGON_POWER.requiredItems, userId);
        await this.userService.updateGold(userId, -actionCost);
        return await this.dragonService.changeNature(dragon, DragonNature.Power);
    }
}
