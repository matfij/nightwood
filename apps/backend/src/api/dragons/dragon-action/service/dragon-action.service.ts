import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateService } from 'src/common/services/date.service';
import { ErrorService } from 'src/common/services/error.service';
import { Repository } from 'typeorm';
import { DragonDto } from '../../dragon/model/dto/dragon.dto';
import { DragonActionType } from '../model/definitions/dragon-action';
import { DragonAction } from '../model/dragon-action.entity';
import { DragonActionDto } from '../model/dto/dragon-action.dto';
import { ExpeditionDto } from '../model/dto/expedition.dto';
import { ExpeditionPageDto } from '../model/dto/expedition-page.dto';
import { MathService } from 'src/common/services/math.service';
import { EXPEDITIONS } from '../data/expeditions';
import { EXPEDITIONS_EVENT } from '../data/expeditions-event';

@Injectable()
export class DragonActionService {
    constructor(
        @InjectRepository(DragonAction)
        private dragonActionRepository: Repository<DragonAction>,
        private errorService: ErrorService,
        private dateService: DateService,
        private mathService: MathService,
    ) {}

    async createAction() {
        const action: DragonActionDto = {
            type: DragonActionType.None,
            nextAction: Date.now(),
            awardCollected: false,
        };
        const dragonAction = this.dragonActionRepository.create(action);

        const savedAction = await this.dragonActionRepository.save(dragonAction);
        return savedAction;
    }

    async getExpeditions(): Promise<ExpeditionPageDto> {
        const expeditions = EXPEDITIONS.map((x) => {
            return {
                ...x,
                loots: [],
                goldAward: null,
                experienceAward: null,
                guardian: {
                    ...x.guardian,
                    strength: null,
                    dexterity: null,
                    endurance: null,
                    will: null,
                    luck: null,
                    skills: null,
                },
            };
        });

        const page: ExpeditionPageDto = {
            data: expeditions,
            meta: {},
        };
        return page;
    }

    async getExpeditionsEvent(): Promise<ExpeditionPageDto> {
        const expeditions = EXPEDITIONS_EVENT.map((x) => {
            return {
                ...x,
                loots: [],
                goldAward: null,
                experienceAward: null,
                guardian: {
                    ...x.guardian,
                    strength: null,
                    dexterity: null,
                    endurance: null,
                    will: null,
                    luck: null,
                    skills: null,
                },
            };
        });
        const page: ExpeditionPageDto = {
            data: expeditions,
            meta: { totalItems: expeditions.length },
        };
        return page;
    }

    async startExpedition(
        expeditionId: string,
        dragon: DragonDto,
        timeReductionPercent: number,
    ): Promise<DragonActionDto> {
        const expedition = [...EXPEDITIONS, ...EXPEDITIONS_EVENT].find((x) => x.uid === expeditionId);
        if (!expedition) {
            this.errorService.throw('errors.expeditionNotFound');
        }
        if (expedition.level > dragon.level) {
            this.errorService.throw('errors.dragonTooYoung');
        }

        dragon.action.nextAction =
            Date.now() +
            Math.round(
                ((100 - timeReductionPercent) / 100) *
                    this.mathService.randRange(0.95, 1.05) *
                    expedition.minimumActionTime,
            );
        dragon.action.type = DragonActionType.Expedition;
        dragon.action.expeditionId = expeditionId;
        dragon.action.awardCollected = false;

        const action = await this.dragonActionRepository.save(dragon.action);
        return action;
    }

    async checkExpedition(dragon: DragonDto): Promise<ExpeditionDto> {
        if (!this.dateService.checkIfNextEventAvailable(dragon.action.nextAction)) return null;
        if (dragon.action.type === DragonActionType.None) return null;
        if (dragon.action.awardCollected) return null;

        dragon.action.awardCollected = true;
        await this.dragonActionRepository.save(dragon.action);

        const expedition = [...EXPEDITIONS, ...EXPEDITIONS_EVENT].find(
            (x) => x.uid === dragon.action.expeditionId,
        );
        return expedition;
    }
}
