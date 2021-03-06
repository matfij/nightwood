import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { DragonActionService } from '../../dragon-action/service/dragon-action.service';
import { Dragon } from '../model/dragon.entity';
import { DragonAdoptDto } from '../model/dto/dragon-adopt.dto';
import { DragonDto } from '../model/dto/dragon.dto';
import { DragonGetDto } from '../model/dto/dragon-get.dto';
import { DragonPageDto } from '../model/dto/dragon-page.dto';
import { DateService } from 'src/common/services/date.service';
import { ItemDto } from 'src/api/items/item/model/dto/item.dto';
import { FoodType } from 'src/api/items/item/model/definitions/item-type';
import { DragonCreateDto } from '../model/dto/dragon-create.dto';
import { ErrorService } from 'src/common/services/error.service';
import { BattleGuardianStartDto, BattleStartDto } from '../model/dto/battle-start.dto';
import { BattleResultDto } from '../model/dto/battle-result.dto';
import { DragonBattleService } from './dragon-battle.service';
import { MathService } from 'src/common/services/math.service';
import { ExpeditionDto } from '../../dragon-action/model/dto/expedition.dto';
import { DragonSkillsService } from '../../dragon-skills/service/dragon-skills.service';
import { SkillLearnDto } from '../../dragon-skills/model/dto/skill-learn.dto';
import { FEED_INTERVAL, FOOD_STAMINA_GAIN, RESTORE_STAMINA_GAIN, RESTORE_STAMINA_INTERVAL } from 'src/configuration/backend.config';
import { DRAGON_MAX_SEARCH_LEVEL, DRAGON_MIN_SEARCH_LEVEL, DRAGON_NAME_MAX_LENGTH, DRAGON_NAME_MIN_LENGTH } from 'src/configuration/frontend.config';
import { DataService } from 'src/common/services/data.service';
import { DRAGON_TAMER_ACTIONS } from '../data/dragon-tamer-actions';
import { DragonTamerActionDto } from '../model/dto/dragon-tamer-actions.dto';
import { DragonNature } from '../model/definitions/dragon-nature';
import { DRAGON_SUMMON_ACTIONS } from '../data/dragon-summon-actions';
import { DragonSummonActionDto } from '../model/dto/dragon-summon.dto';
import { BattleDragonDto } from '../model/definitions/dragon-battle';
import { BattleHelperService } from './dragon-helper.service';
import { BOOSTERS } from 'src/api/items/alchemy/model/data/boosters';
import { EXPEDITIONS } from '../../dragon-action/model/data/expeditions';

@Injectable()
export class DragonService {

    constructor(
        @InjectRepository(Dragon)
        private dragonRepository: Repository<Dragon>,
        private dragonBattleService: DragonBattleService,
        private battleHelperService: BattleHelperService,
        private dragonActionService: DragonActionService,
        private dragonSkillsService: DragonSkillsService,
        private errorService: ErrorService,
        private dataService: DataService,
        private dateService: DateService,
        private mathService: MathService,
    ) {}

    async create(dto: DragonCreateDto): Promise<DragonDto> {
        const dragon = this.dragonRepository.create({ ...dto }) as DragonDto;
        dragon.action = await this.dragonActionService.createAction();
        dragon.skills = await this.dragonSkillsService.createSkills(dto.skills);
        const savedDragon = await this.dragonRepository.save(dragon);

        return savedDragon;
    }

    async getOne(id: string | number): Promise<DragonDto> {
        const dragon = await this.dragonRepository.findOne(id, { relations: ['action', 'skills', 'runes'] }) as DragonDto

        dragon.runes = dragon.runes.map(rune => { return { ...rune, ...this.dataService.getItemData(rune.uid) } });
        if (dragon.boosterUid) dragon.booster = BOOSTERS.find(booster => booster.uid === dragon.boosterUid);

        return dragon;
    }

    async getAll(dto: DragonGetDto): Promise<DragonPageDto> {
        const filterOptions: FindManyOptions<Dragon> = {
            where: { level: Between(dto.minLevel ?? DRAGON_MIN_SEARCH_LEVEL, dto.maxLevel ?? DRAGON_MAX_SEARCH_LEVEL) },
            select: ['id', 'name', 'level', 'nature'],
            order: { level: 'DESC' },
        };

        const dragons = await this.dragonRepository.find({
            ...filterOptions,
            skip: dto.page * dto.limit,
            take: dto.limit,
        });
        const count = await this.dragonRepository.count({
            ...filterOptions,
        });

        const dragonPage: DragonPageDto = {
            data: dragons,
            meta: { totalItems: count },
        };
        return dragonPage;
    }

    async getBest(dto: DragonGetDto): Promise<DragonPageDto> {
        const filterOptions: FindManyOptions<Dragon> = {
            where: { level: Between(dto.minLevel ?? DRAGON_MIN_SEARCH_LEVEL, dto.maxLevel ?? DRAGON_MAX_SEARCH_LEVEL) },
            select: ['name', 'level', 'nature', 'experience'],
            order: { experience: 'DESC' },
        };

        const dragons = await this.dragonRepository.find({
            ...filterOptions,
            skip: dto.page * dto.limit,
            take: dto.limit,
        });
        const count = await this.dragonRepository.count({
            ...filterOptions,
        });

        const dragonPage: DragonPageDto = {
            data: dragons,
            meta: { totalItems: count },
        };
        return dragonPage;
    }

    async adopt(ownerId: number, dto: DragonAdoptDto): Promise<DragonDto> {
        if (dto.name.length < DRAGON_NAME_MIN_LENGTH || dto.name.length > DRAGON_NAME_MAX_LENGTH) this.errorService.throw('errors.incorrectDragonName');
        if (!this.errorService.checkBannedWords(dto.name)) this.errorService.throw('errors.bannedWordUse');

        const dragon = this.dragonRepository.create({ ...dto, ownerId: ownerId }) as DragonDto;
        dragon.action = await this.dragonActionService.createAction();
        dragon.skills = await this.dragonSkillsService.createSkills(null);
        const savedDragon = await this.dragonRepository.save(dragon);

        return savedDragon;
    }

    async getOwnedDragons(ownerId: number): Promise<DragonDto[]> {
        const filterOptions: FindManyOptions<Dragon> = {
            where: { ownerId: ownerId },
            relations: ['action', 'skills'],
            order: { experience: 'DESC' },
        };

        const dragons = await this.dragonRepository.find({
            ...filterOptions,
        });

        return dragons;
    }

    async checkDragon(ownerId: number, dragonId: number): Promise<DragonDto> {
        const dragon = await this.getOne(dragonId);

        if (!dragon) this.errorService.throw('errors.dragonNotFound');
        if (dragon.ownerId !== ownerId) this.errorService.throw('errors.dragonNotFound');

        return dragon;
    }

    async checkFeedingDragon(ownerId: number, dragonId: number): Promise<DragonDto> {
        const dragon = await this.checkDragon(ownerId, dragonId);

        if (!this.dateService.checkIfEventAvailable(dragon.nextFeed)) this.errorService.throw('errors.dragonAlreadyFed');

        return dragon;
    }

    async calculateStatistics(ownerId: number, dragonId: number): Promise<BattleDragonDto> {
        const dragon = await this.checkDragon(ownerId, dragonId);

        const battleDragon = this.battleHelperService.calculateBattleStats(dragon);

        return battleDragon;
    }

    async feedDragon(item: ItemDto, dragon: DragonDto): Promise<DragonDto> {
        if (dragon.level < item.level) this.errorService.throw('errors.dragonTooYoung');

        let levelGain = 1;
        switch(item.foodType) {
            case FoodType.Strength: { dragon.strength += 1; break; }
            case FoodType.Dexterity: { dragon.dexterity += 1; break; }
            case FoodType.Endurance: { dragon.endurance += 1; break; }
            case FoodType.Will: { dragon.will += 1; break; }
            case FoodType.Luck: { dragon.luck += 1; break; }
            case FoodType.Complete: { dragon.strength += 1; dragon.dexterity += 1; dragon.endurance += 1; dragon.will += 1; dragon.luck += 1; break; }
            case FoodType.StrengthPotion: { dragon.strength += 3; levelGain = 3; break; }
            case FoodType.DexterityPotion: { dragon.dexterity += 3; levelGain = 3; break; }
            case FoodType.EndurancePotion: { dragon.endurance += 3; levelGain = 3; break; }
            case FoodType.WillPotion: { dragon.will += 3; levelGain = 3; break; }
            case FoodType.LuckPotion: { dragon.luck += 3; levelGain = 3; break; }
            case FoodType.CompletePotion: { dragon.strength += 1; dragon.dexterity += 1; dragon.endurance += 1; dragon.will += 1; dragon.luck += 1; levelGain = 3; break; }
        };
        dragon.level += levelGain;
        dragon.skillPoints += levelGain;
        dragon.nextFeed = Date.now() + FEED_INTERVAL;

        dragon.battledWith = [];
        dragon.stamina = FOOD_STAMINA_GAIN;
        dragon.boosterUid = null;

        const fedDragon = await this.dragonRepository.save(dragon);
        return fedDragon;
    }
    
    async activateBooster(dragon: DragonDto, booster: ItemDto): Promise<DragonDto> {
        dragon.boosterUid = booster.uid;
        await this.dragonRepository.save(dragon);

        return dragon;
    }

    async checkIfEventAvailable(ownerId: number, dragonId: number): Promise<DragonDto> {
        const dragon = await this.checkDragon(ownerId, dragonId);

        if (!this.dateService.checkIfEventAvailable(dragon.action.nextAction)) this.errorService.throw('errors.dragonBusy');

        return dragon;
    }

    async awardExpeditionGold(dragon: DragonDto, expedition: ExpeditionDto): Promise<number> {
        let baseGold = expedition.gold;
        if (dragon.unlockedExpeditions.includes(expedition.uid)) baseGold += expedition.extraGold;

        const gainedGold = this.mathService.randRange(0.9, 1.1) * baseGold * (1 + dragon.skills.beginnersLuck/35);
        return Math.round(gainedGold);
    }

    async startBattle(ownerId: number, dto: BattleStartDto): Promise<BattleResultDto> {
        if (dto.ownedDragonId === dto.enemyDragonId) this.errorService.throw('errors.battleItself');

        const ownedDragon = await this.checkIfEventAvailable(ownerId, dto.ownedDragonId);
        ownedDragon.action = null;
        if (ownedDragon.stamina < 1) this.errorService.throw('errors.noStamina');

        if (ownedDragon.battledWith.filter(id => id === dto.enemyDragonId).length > 1) this.errorService.throw('errors.alreadyBattled');

        const enemyDragon = await this.getOne(dto.enemyDragonId);
        enemyDragon.action = null;

        const partialResult = await this.dragonBattleService.executeBattle(ownedDragon, enemyDragon);

        const battleResult: BattleResultDto = {
            ownedDragon: partialResult.ownedDragon,
            enemyDragon: partialResult.enemyDragon,
            logs: partialResult.logs,
            result: partialResult.result,
        }
        return battleResult;
    }

    async startGuardianBattle(ownerId: number, dto: BattleGuardianStartDto): Promise<BattleResultDto> {
        const ownedDragon = await this.checkIfEventAvailable(ownerId, dto.ownedDragonId);
        ownedDragon.action = null;
        if (ownedDragon.stamina < 1) this.errorService.throw('errors.noStamina');

        const expedition = EXPEDITIONS.find(e => e.uid === dto.expeditionUid);
        if (!expedition) this.errorService.throw('errors.expeditionNotFound');

        if (ownedDragon.level < expedition.guardian.level) this.errorService.throw('errors.dragonTooYoung');

        const partialResult = await this.dragonBattleService.executeGuardianBattle(ownedDragon, expedition);

        const battleResult: BattleResultDto = {
            ownedDragon: partialResult.ownedDragon,
            enemyDragon: partialResult.enemyDragon,
            logs: partialResult.logs,
            result: partialResult.result,
        }
        return battleResult;
    }

    async releaseDragon(ownerId: number, dragonId: number | string): Promise<void> {
        const dragon = await this.checkDragon(ownerId, +dragonId);

        await this.dragonRepository.update(dragon.id, { ownerId: null });
    }

    async learnSkill(ownerId: number, dto: SkillLearnDto): Promise<DragonDto> {
        const dragon = await this.checkDragon(ownerId, dto.dragonId);

        const updatedDragon = await this.dragonSkillsService.learnSkill(dto.skillUid, dragon);
        await this.dragonRepository.update(dragon.id, { skillPoints: updatedDragon.skillPoints });
        return updatedDragon;
    }

    async getTamerActions(): Promise<DragonTamerActionDto[]> {
        return DRAGON_TAMER_ACTIONS;
    }

    async changeName(dragon: DragonDto, newName: string): Promise<DragonDto> {
        dragon.name = newName;
        return await this.dragonRepository.save(dragon);
    }

    async resetSkills(dragon: DragonDto): Promise<DragonDto> {
        await this.dragonSkillsService.resetSkills(dragon);
        dragon.skillPoints = dragon.level;
        return await this.dragonRepository.save(dragon);
    }

    async restoreStamina(dragon: DragonDto): Promise<DragonDto> {
        dragon.battledWith = [];
        dragon.stamina = RESTORE_STAMINA_GAIN;
        dragon.boosterUid = null;
        dragon.nextFeed = Date.now() + RESTORE_STAMINA_INTERVAL;

        return await this.dragonRepository.save(dragon);
    }

    async changeNature(dragon: DragonDto, newNature: DragonNature): Promise<DragonDto> {
        await this.resetSkills(dragon);

        dragon.nature = newNature;

        return await this.dragonRepository.save(dragon);
    }

    async getSummonActions(): Promise<DragonSummonActionDto[]> {
        return DRAGON_SUMMON_ACTIONS;
    }
}
