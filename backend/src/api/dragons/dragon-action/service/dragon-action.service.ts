import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DragonActionType } from '../model/definitions/dragon-action';
import { DragonAction } from '../model/dragon-action.entity';
import { DragonActionDto } from '../model/dto/dragon-action.dto';

@Injectable()
export class DragonActionService {

  constructor(
    @InjectRepository(DragonAction)
    private dragonActionRepository: Repository<DragonAction>,
  ) {}

  async create() {
    const action: DragonActionDto = { type: DragonActionType.None };
    const dragonAction = this.dragonActionRepository.create(action);

    const savedAction = await this.dragonActionRepository.save(dragonAction);
    return savedAction;
  }

}
