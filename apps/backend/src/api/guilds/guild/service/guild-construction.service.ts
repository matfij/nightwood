import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guild } from '../model/guild.entity';
import { Repository } from 'typeorm';
import { ErrorService } from '../../../../common/services/error.service';

@Injectable()
export class GuildConstructionService {
    constructor(
        @InjectRepository(Guild)
        private guildRepository: Repository<Guild>,
        private errorService: ErrorService,
    ) {}

    async donateGold(guildId: number, gold: number): Promise<void> {
        const guild = await this.guildRepository.findOne({ where: { id: guildId } });
        if (!guild) {
            this.errorService.throw('errors.guildNotFound');
        }
        guild.gold += gold;
        await this.guildRepository.update({ id: guild.id }, { gold: guild.gold });
    }
}
