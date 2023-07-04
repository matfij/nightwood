import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorService } from "src/common/services/error.service";
import { SKILL_DEVELOPMENT_LIMIT } from "src/configuration/backend.config";
import { Repository } from "typeorm";
import { DragonDto } from "../../dragon/model/dto/dragon.dto";
import { ALL_SKILLS } from "../data/skill-groups";
import { Skill } from "../model/definitions/dragons-skills";
import { DragonSkills } from "../model/dragon-skills.entity";
import { DragonSkillsDto } from "../model/dto/dragon-skills.dto";
import { SkillGetDto } from "../model/dto/skill-get.dto";
import { SkillDto } from "../model/dto/skill.dto";

@Injectable()
export class DragonSkillsService {

    constructor(
        @InjectRepository(DragonSkills)
        private dragonSkillsRepository: Repository<DragonSkills>,
        private errorService: ErrorService,
    ) {}

    async createSkills(dto: DragonSkillsDto): Promise<DragonSkillsDto> {
        const skills: DragonSkillsDto = dto ?? {};
        const dragonSkills = this.dragonSkillsRepository.create(skills);
    
        return await this.dragonSkillsRepository.save(dragonSkills);
    }

    async getSkills(dto: SkillGetDto): Promise<SkillDto[]> {
        let skills: Skill[] = ALL_SKILLS;

        if (dto.minLevel) skills = skills.filter(skill => skill.level >= dto.minLevel);
        if (dto.maxLevel) skills = skills.filter(skill => skill.level <= dto.maxLevel);
        if (dto.requiredNature) skills = skills.filter(skill => skill.requiredNature.includes(dto.requiredNature) || skill.requiredNature.length === 0);

        skills.sort((a, b) => a.level - b.level);

        return skills;
    }

    async learnSkill(skillUid: string, dragon: DragonDto): Promise<DragonDto> {
        if (dragon.skillPoints < 1) this.errorService.throw('errors.insufficientSkillPoints');

        const skill = ALL_SKILLS.find(skill => skill.uid === skillUid);
        if (!skill) this.errorService.throw('errors.skillNotFound');
        if (skill.level > dragon.level) this.errorService.throw('errors.dragonTooYoung');
        if (!skill.requiredNature.includes(dragon.nature) && skill.requiredNature.length != 0) this.errorService.throw('errors.natureMismatch');
        if (dragon.skills[skillUid] >= SKILL_DEVELOPMENT_LIMIT) this.errorService.throw('errors.skillLimitReached');

        dragon.skills[skillUid] += 1;
        dragon.skillPoints -= 1;
        await this.dragonSkillsRepository.save(dragon.skills);

        return dragon;
    }

    async resetSkills(dragon: DragonDto): Promise<DragonDto> {
        for (const skill in dragon.skills) {
            if (skill != 'id') dragon.skills[skill] = 0;
        }
        await this.dragonSkillsRepository.save(dragon.skills);

        return dragon;
    }
}
