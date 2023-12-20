import { Injectable } from '@nestjs/common';
import { ExpeditionGuardianDto } from '../../dragon-action/model/dto/expedition-guardian.dto';
import { DragonBattleDto } from '../model/dto/dragon-battle.dto';
import { DragonDto } from '../model/dto/dragon.dto';
import { Skill } from '../../dragon-skills/model/definitions/dragons-skills';
import { MathService } from '../../../../common/services/math.service';

@Injectable()
export class DragonBattleHelperService {
    private readonly MIN_DAMAGE_MULTIPLIER = 0.025;

    constructor(private mathService: MathService) {}

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
        const castFactor = dragon.skills.conserve ? 1 - dragon.skills.conserve / 60 : 1;
        const castCost = castFactor * skill.castMana * (1 + skillPoints / 7);
        const canUse = skillPoints > 0 && castCost <= dragon.mana && skill.castChance > Math.random();
        return canUse;
    }

    getSkillCost(dragon: DragonBattleDto, skill: Skill) {
        const skillPoints = dragon.skills[skill.uid];
        const castFactor = dragon.skills.conserve ? 1 - dragon.skills.conserve / 60 : 1;
        const castCost = castFactor * skill.castMana * (1 + skillPoints / 6) * 1;
        return castCost;
    }

    getSkillInflictedDamage(skill: Skill, attacker: DragonBattleDto, defender: DragonBattleDto, blocked = 0) {
        const baseDamage =
            this.mathService.randRange(1 - skill.damageSpread, 1 + skill.damageSpread) *
            (1 + skill.damageMod * attacker.skills[skill.uid]) *
            (1 + skill.magicalAttackMod * attacker.magicalAttack) *
            (1 + skill.physicalAttackMod * attacker.physicalAttack);
        const inflictedDamage =
            baseDamage *
            this.mathService.limit(
                this.MIN_DAMAGE_MULTIPLIER,
                1 - skill.magicalDefMod * defender.resistance,
            ) *
            this.mathService.limit(this.MIN_DAMAGE_MULTIPLIER, 1 - skill.physicalDefMod * defender.armor) *
            this.mathService.limit(0, 1 - blocked);
        return { baseDamage, inflictedDamage };
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
