import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DragonActionService } from '../../dragon-action/service/dragon-action.service';
import { Dragon } from '../model/dragon.entity';
import { AdoptDragonDto } from '../model/dto/adopt-dragon.dto';
import { DragonDto } from '../model/dto/dragon.dto';
import { GetDragonDto } from '../model/dto/get-dragon.dto';
import { PageDragonDto } from '../model/dto/page-dragon.dto';
import { paginate } from 'nestjs-typeorm-paginate';
import { DEFAULT_STAMINA, FEED_INTERVAL, GET_ALL_RELATIONS, GET_ONE_RELATIONS } from 'src/configuration/dragon.config';
import { DateService } from 'src/common/services/date.service';
import { ItemDto } from 'src/api/items/item/model/dto/item.dto';
import { FoodType } from 'src/api/items/item/model/definitions/item-type';
import { CreateDragonDto } from '../model/dto/create-dragon.dto';
import { ErrorService } from 'src/common/services/error.service';
import { StartBattleDto } from '../model/dto/start-battle.dto';
import { BattleResultDto } from '../model/dto/battle-result.dto';
import { DragonBattleService } from './dragon-battle.service';
import { MathService } from 'src/common/services/math.service';
import { ExpeditionDto } from '../../dragon-action/model/dto/expedition.dto';

@Injectable()
export class DragonService {

    constructor(
        @InjectRepository(Dragon)
        private dragonRepository: Repository<Dragon>,
        private dragonBattleService: DragonBattleService,
        private dragonActionService: DragonActionService,
        private errorService: ErrorService,
        private dateService: DateService,
        private mathService: MathService,
    ) {}

    async create(dto: CreateDragonDto): Promise<DragonDto> {
        const dragon = this.dragonRepository.create({ ...dto });
        dragon.action = await this.dragonActionService.create();
        const savedDragon = await this.dragonRepository.save(dragon);

        return savedDragon;
    }

    async getOne(id: string | number): Promise<DragonDto> {
        return this.dragonRepository.findOne(id, { relations: GET_ONE_RELATIONS });
    }

    async getAll(dto: GetDragonDto): Promise<PageDragonDto> {
        dto.page = dto.page ?? 0;
        dto.limit = dto.limit ?? 20;
        dto.minLevel = dto.minLevel ?? 0;
        dto.maxLevel = dto.maxLevel ?? 999;

        const dragons = await this.dragonRepository
            .createQueryBuilder('dragon')
            .where('dragon.level >= :minLevel')
            .andWhere('dragon.level <= :maxLevel')
            .setParameters({ minLevel: dto.minLevel, maxLevel: dto.maxLevel })
            .orderBy('level')
            .skip(dto.page * dto.limit)
            .take(dto.limit)
            .getMany();


        const dragonPage: PageDragonDto = {
            data: dragons,
            meta: { totalItems: dragons.length },
        };
        return dragonPage;
    }

    async adopt(ownerId: number, dto: AdoptDragonDto): Promise<DragonDto> {
        const dragon = this.dragonRepository.create({ ...dto, ownerId: ownerId });
        dragon.action = await this.dragonActionService.create();
        const savedDragon = await this.dragonRepository.save(dragon);

        return savedDragon;
    }

    async getOwnedDragons(ownerId: number): Promise<DragonDto[]> {
        const dragons = await this.dragonRepository
            .createQueryBuilder('dragon')
            .leftJoinAndSelect('dragon.action', 'action')
            .where('dragon.ownerId = :ownerId')
            .setParameters({ ownerId: ownerId })
            .getMany();

        return dragons;
    }

    async checkDragon(ownerId: number, dragonId: number): Promise<DragonDto> {
        const dragon = await this.dragonRepository.findOne(dragonId, { relations: GET_ALL_RELATIONS });

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
            case FoodType.Special: { 
                dragon.strength += 1; 
                dragon.dexterity += 1; 
                dragon.endurance += 1; 
                dragon.will += 1; 
                dragon.luck += 1; 
                break; 
            }
        };
        dragon.level += 1;
        dragon.nextFeed = Date.now() + FEED_INTERVAL;

        dragon.stamina = DEFAULT_STAMINA;

        const fedDragon = await this.dragonRepository.save(dragon);
        return fedDragon;
    }

    async checkIfEventAvailable(ownerId: number, dragonId: number): Promise<DragonDto> {
        const dragon = await this.checkDragon(ownerId, dragonId);

        if (!this.dateService.checkIfEventAvailable(dragon.action.nextAction)) this.errorService.throw('errors.dragonBusy');

        return dragon;
    }

    async awardExpeditionExperience(dragon: DragonDto, expedition: ExpeditionDto): Promise<number> {
        const gainedExperience = Math.round(this.mathService.randRange(0.8, 1.1) * expedition.experienceAward);
        dragon.experience += gainedExperience;
    
        await this.dragonRepository.update(dragon.id, { experience: dragon.experience });
        return gainedExperience;
    }

    async awardExpeditionGold(dragon: DragonDto, expedition: ExpeditionDto): Promise<number> {
        const gainedGold = 
            this.mathService.randRange(0.8, 1.1)
            * (1 + (dragon.luck / (1.5*dragon.level + 10)))
            * expedition.goldAward;
        return Math.round(gainedGold);
    }

    async startBattle(ownerId: number, dto: StartBattleDto): Promise<BattleResultDto> {
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

}
