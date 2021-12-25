import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DragonActionService } from '../../dragon-action/service/dragon-action.service';
import { Dragon } from '../model/dragon.entity';
import { CreateDragonDto } from '../model/dto/create-dragon.dto';
import { DragonDto } from '../model/dto/dragon.dto';
import { GetDragonDto } from '../model/dto/get-dragon.dto';
import { PageDragonDto } from '../model/dto/page-dragon.dto';
import { paginate } from 'nestjs-typeorm-paginate';
import { FEED_INTERVAL, GET_ALL_RELATIONS, GET_ONE_RELATIONS } from 'src/configuration/dragon.config';
import { UserService } from 'src/api/users/user/service/user.service';
import { UserDto } from 'src/api/users/user/model/dto/user.dto';
import { Item } from 'src/api/items/item/model/item.entity';
import { TranslateService } from 'src/common/services/translate.service';
import { DateService } from 'src/common/services/date.service';
import { ItemDto } from 'src/api/items/item/model/dto/item.dto';
import { FoodType } from 'src/api/items/item/model/definitions/item-type';

@Injectable()
export class DragonService {

    constructor(
        @InjectRepository(Dragon)
        private dragonRepository: Repository<Dragon>,
        private dragonActionService: DragonActionService,
        private userService: UserService,
        private translateService: TranslateService,
        private dateService: DateService,
    ) {}

    async create(owner: UserDto, dto: CreateDragonDto): Promise<DragonDto> {
        await this.userService.incrementOwnedDragons(owner.id);
        
        const dragon = this.dragonRepository.create({ ...dto, ownerId: owner.id });
        dragon.action = await this.dragonActionService.create();
        const savedDragon = await this.dragonRepository.save(dragon);

        return savedDragon;
    }

    async getOne(id: string): Promise<DragonDto> {
        return this.dragonRepository.findOne(id, { relations: GET_ONE_RELATIONS });
    }

    async getAll(dto: GetDragonDto): Promise<PageDragonDto> {
        const page = await paginate<DragonDto>(
            this.dragonRepository, 
            { page: dto.page, limit: dto.limit }, 
            { relations: GET_ALL_RELATIONS },
        );

        const dragonPage: PageDragonDto = {
            data: page.items.filter(x => x.ownerId === dto.ownerId),
            meta: page.meta,
        };
        return dragonPage;
    }

    async checkFeedingDragon(ownerId: number, dragonId: number): Promise<DragonDto> {
        const dragon = await this.dragonRepository.findOne(dragonId);

        if (!dragon) await this.translateService.throw('errors.dragonNotFound');
        if (dragon.ownerId !== ownerId) await this.translateService.throw('errors.dragonNotFound');
        if (!this.dateService.checkIfEventAvailable(dragon.nextFeed)) await this.translateService.throw('errors.dragonAlreadyFed');

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
        dragon.nextFeed = Date.now() + FEED_INTERVAL;

        const fedDragon = await this.dragonRepository.save(dragon);
        return fedDragon;
    }

}
