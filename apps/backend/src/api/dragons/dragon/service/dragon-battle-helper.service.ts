import { Injectable } from '@nestjs/common';
import { ExpeditionGuardianDto } from '../../dragon-action/model/dto/expedition-guardian.dto';
import { DragonBattleDto } from '../model/dto/dragon-battle.dto';
import { DragonDto } from '../model/dto/dragon.dto';
import { Skill } from '../../dragon-skills/model/definitions/dragons-skills';

@Injectable()
export class DragonBattleHelperService {
    createDragonFromGuardian(guardian: ExpeditionGuardianDto): Partial<DragonDto> {
        const dragon: Partial<DragonDto> = {
            ...guardian,
        };
        return dragon;
    }

    tryUseSkill(dragon: DragonBattleDto, skill: Skill) {
        const skillPoints = dragon.skills[skill.uid];
        if (!skillPoints) {
            return false;
        }
        const castFactor = dragon.skills.conserve ? 1 - (dragon.skills.conserve / 60) : 1;
        const castCost = castFactor * skill.castMana * (1 + skillPoints / 7);
        const canUse = skillPoints > 0 && castCost <= dragon.mana && skill.castChance > Math.random();
        return canUse;
    }

    getSkillCost(dragon: DragonBattleDto, skill: Skill) {
        const skillPoints = dragon.skills[skill.uid];
        const castFactor = dragon.skills.conserve ? 1 - (dragon.skills.conserve / 60) : 1;
        const castCost = castFactor * skill.castMana * (1 + skillPoints / 6) * (1);
        return castCost;
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
