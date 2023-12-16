import { Injectable } from '@nestjs/common';
import { ExpeditionGuardianDto } from '../../dragon-action/model/dto/expedition-guardian.dto';
import { DragonBattleDto } from '../model/dto/dragon-battle.dto';
import { DragonDto } from '../model/dto/dragon.dto';

@Injectable()
export class DragonBattleHelperService {
    createDragonFromGuardian(guardian: ExpeditionGuardianDto): Partial<DragonDto> {
        const dragon: Partial<DragonDto> = {
            ...guardian,
        };

        return dragon;
    }

    getSkillLog(
        name: string,
        attacker: DragonBattleDto,
        defender: DragonBattleDto,
        baseDamage: number,
        inflictedDamege: number,
        extraLogs: string[],
        extraClasses?: string,
    ) {
        let log = `
        <div class="item-log log-skill ${extraClasses}">
            ${attacker.name} (${Math.round(attacker.health)}) uses <b>${name}</b>
            with power of ${Math.round(baseDamage)}`;
        extraLogs.forEach((extraLog) => (log += extraLog));
        log += `<div>${defender.name} (${Math.round(defender.health)}) took ${Math.round(
            inflictedDamege,
        )} damage</div></div>`;
        return log;
    }
}
