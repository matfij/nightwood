import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import { ErrorService } from 'src/common/services/error.service';
import { Repository } from 'typeorm';
import { DragonDto } from '../../dragon/model/dto/dragon.dto';
import { CARRANGA_SANDS, HARNA_PEAKS, ANDREW_FOREST } from '../model/data/expeditions';
import { DragonActionType } from '../model/definitions/dragon-action';
import { DragonAction } from '../model/dragon-action.entity';
import { DragonActionDto } from '../model/dto/dragon-action.dto';
import { PageExpeditionDto } from '../model/dto/page-expedition.dto';

@Injectable()
export class DragonActionService {

  private readonly EXPEDITIONS = [
    ANDREW_FOREST,
    CARRANGA_SANDS,
    HARNA_PEAKS,
  ];

  constructor(
    @InjectRepository(DragonAction)
    private dragonActionRepository: Repository<DragonAction>,
    private errorService: ErrorService,
  ) {}

  async create() {
    const action: DragonActionDto = { type: DragonActionType.None };
    const dragonAction = this.dragonActionRepository.create(action);

    const savedAction = await this.dragonActionRepository.save(dragonAction);
    return savedAction;
  }

  async getExpeditions(): Promise<PageExpeditionDto> {
    const expeditions = this.EXPEDITIONS.map(x => { return { ...x, loots: [] } });

    const page: PageExpeditionDto = {
      data: expeditions,
      meta: {},
    }
    return page;
  }

  async startExpedition(expeditionId: number, dragon: DragonDto): Promise<DragonActionDto> {
    const expedition = this.EXPEDITIONS.find(x => x.id === expeditionId);
    if (!expedition) this.errorService.throw('errors.expeditionNotFound');

    if (expedition.level > dragon.level) this.errorService.throw('dragonTooYoung');

    dragon.action.nextAction = Date.now() + expedition.minimumActionTime - randomInt(30 * 60 * 1000);
    dragon.action.type = DragonActionType.Expedition;

    const action = await this.dragonActionRepository.save(dragon.action);
    return action;
  }

}
