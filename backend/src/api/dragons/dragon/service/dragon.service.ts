import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DragonActionService } from '../../dragon-action/service/dragon-action.service';
import { Dragon } from '../model/dragon.entity';
import { CreateDragonDto } from '../model/dto/create-dragon.dto';
import { DragonDto } from '../model/dto/dragon.dto';
import { Request } from '@nestjs/common';

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

}
