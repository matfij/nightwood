import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DragonActionService } from '../../dragon-action/service/dragon-action.service';
import { Dragon } from '../model/dragon.entity';
import { CreateDragonDto } from '../model/dto/create-dragon.dto';
import { DragonDto } from '../model/dto/dragon.dto';
import { GetDragonDto } from '../model/dto/get-dragon.dto';
import { PageDragonDto } from '../model/dto/page-dragon.dto';
import { paginate } from 'nestjs-typeorm-paginate';
import { GET_ALL_RELATIONS, GET_ONE_RELATIONS } from 'src/configuration/dragon.config';

@Injectable()
export class DragonService {

    constructor(
        @InjectRepository(Dragon)
        private dragonRepository: Repository<Dragon>,
        private dragonActionService: DragonActionService,
    ) {}

    async create(ownerId: number, dto: CreateDragonDto): Promise<DragonDto> {
        const dragon = this.dragonRepository.create({...dto, ownerId});
        dragon.action = this.dragonActionService.create();

        return this.dragonRepository.save(dragon);
    }

    async getOne(id: string): Promise<DragonDto> {
        return this.dragonRepository.findOne(id, { relations: GET_ONE_RELATIONS });
    }

    async getAll(dto: GetDragonDto): Promise<PageDragonDto> {
        const page = await paginate<DragonDto>(
            this.dragonRepository, 
            { page: dto.page, limit: dto.limit }, 
            { relations: GET_ALL_RELATIONS }
        );

        const dragonPage: PageDragonDto = {
            data: page.items,
            meta: page.meta,
        };
        return dragonPage;
    }

}
