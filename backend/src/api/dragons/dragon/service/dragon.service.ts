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
import { BattleStartDto } from '../model/dto/battle-start.dto';
import { BattleResultDto } from '../model/dto/battle-result.dto';
import { DragonBattleService } from './dragon-battle.service';
import { MathService } from 'src/common/services/math.service';
import { ExpeditionDto } from '../../dragon-action/model/dto/expedition.dto';
import { DragonSkillsService } from '../../dragon-skills/service/dragon-skills.service';
import { SkillLearnDto } from '../../dragon-skills/model/dto/skill-learn.dto';
import { FEED_INTERVAL, FOOD_STAMINA_GAIN } from 'src/configuration/backend.config';
import { DRAGON_MAX_SEARCH_LEVEL, DRAGON_MIN_SEARCH_LEVEL } from 'src/configuration/frontend.config';

@Injectable()
export class DragonService {

    constructor(
        @InjectRepository(Dragon)
        private dragonRepository: Repository<Dragon>,
        private dragonBattleService: DragonBattleService,
        private dragonActionService: DragonActionService,
        private dragonSkillsService: DragonSkillsService,
        private errorService: ErrorService,
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
        return this.dragonRepository.findOne(id, { relations: ['action', 'skills'] });
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
            order: { id: 'ASC' },
        };

        const dragons = await this.dragonRepository.find({
            ...filterOptions,
        });

        return dragons;
    }

    async checkDragon(ownerId: number, dragonId: number): Promise<DragonDto> {
        const dragon = await this.dragonRepository.findOne(dragonId, { relations: ['action', 'skills'] });

        if (!dragon) this.errorService.throw('errors.dragonNotFound');
        if (dragon.ownerId !== ownerId) this.errorService.throw('errors.dragonNotFound');

        return dragon;
    }

    async checkFeedingDragon(ownerId: number, dragonId: number): Promise<DragonDto> {
        const dragon = await this.checkDragon(ownerId, dragonId);

        if (!this.dateService.checkIfEventAvailable(dragon.nextFeed)) this.errorService.throw('errors.dragonAlreadyFed');

        return dragon;
    }

    async feedDragon(item: ItemDto, dragon: DragonDto): Promise<DragonDto> {
        switch(item.foodType) {
            case FoodType.Strength: { dragon.strength += 1; break; }
            case FoodType.Dexterity: { dragon.dexterity += 1; break; }
            case FoodType.Endurance: { dragon.endurance += 1; break; }
            case FoodType.Will: { dragon.will += 1; break; }
            case FoodType.Luck: { dragon.luck += 1; break; }
            case FoodType.Complete: { 
                dragon.strength += 1; 
                dragon.dexterity += 1; 
                dragon.endurance += 1; 
                dragon.will += 1; 
                dragon.luck += 1; 
                break; 
            }
        };
        dragon.level += 1;
        dragon.skillPoints += 1;
        dragon.nextFeed = Date.now() + FEED_INTERVAL;

        dragon.stamina = FOOD_STAMINA_GAIN;

        const fedDragon = await this.dragonRepository.save(dragon);
        return fedDragon;
    }

    async checkIfEventAvailable(ownerId: number, dragonId: number): Promise<DragonDto> {
        const dragon = await this.checkDragon(ownerId, dragonId);

        if (!this.dateService.checkIfEventAvailable(dragon.action.nextAction)) this.errorService.throw('errors.dragonBusy');

        return dragon;
    }

    async awardExpeditionExperience(dragon: DragonDto, expedition: ExpeditionDto): Promise<number> {
        const gainedExperience = Math.round(this.mathService.randRange(0.8, 1.2) * expedition.experienceAward);
        dragon.experience += gainedExperience;
    
        await this.dragonRepository.update(dragon.id, { experience: dragon.experience });
        return gainedExperience;
    }

    async awardExpeditionGold(dragon: DragonDto, expedition: ExpeditionDto): Promise<number> {
        const gainedGold = 
            this.mathService.randRange(0.8, 1.2) * expedition.goldAward
                * Math.log(1 + 3*dragon.luck / dragon.level);
        return Math.round(gainedGold);
    }

    async startBattle(ownerId: number, dto: BattleStartDto): Promise<BattleResultDto> {
        if (dto.ownedDragonId === dto.enemyDragonId) this.errorService.throw('errors.battleItself');

        const ownedDragon = await this.checkIfEventAvailable(ownerId, dto.ownedDragonId);
        ownedDragon.action = null;
        if (ownedDragon.stamina < 1) this.errorService.throw('errors.noStamina');

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

}
