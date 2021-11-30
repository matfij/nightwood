import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dragon } from '../model/dragon.entity';
import { CreateDragonDto } from '../model/dto/create-dragon.dto';
import { DragonDto } from '../model/dto/dragon.dto';

@Injectable()
export class DragonService {

    constructor(
        @InjectRepository(Dragon)
        private userRepository: Repository<Dragon>,
    ) {}

    async create(dto: CreateDragonDto): Promise<DragonDto> {
        return dto;
    }
}
