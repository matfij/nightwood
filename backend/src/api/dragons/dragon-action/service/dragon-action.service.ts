import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CARRANGA_SANDS, HARNA_PEAKS, LUKAMER_FOREST } from '../model/data/expeditions';
import { DragonActionType } from '../model/definitions/dragon-action';
import { DragonAction } from '../model/dragon-action.entity';
import { DragonActionDto } from '../model/dto/dragon-action.dto';
import { PageExpeditionDto } from '../model/dto/page-expedition.dto';

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

  async getExpeditions(): Promise<PageExpeditionDto> {
    const expeditions = [
      { ...LUKAMER_FOREST, loots: [] },
      { ...CARRANGA_SANDS, loots: [] },
      { ...HARNA_PEAKS, loots: [] },
    ];

    const page: PageExpeditionDto = {
      data: expeditions,
      meta: {},
    }
    return page;
  }

}
