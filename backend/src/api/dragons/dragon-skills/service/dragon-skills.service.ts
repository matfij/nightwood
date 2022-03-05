import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorService } from "src/common/services/error.service";
import { SKILL_DEVELOPMENT_LIMIT } from "src/configuration/backend.config";
import { Repository } from "typeorm";
import { DragonDto } from "../../dragon/model/dto/dragon.dto";
import { ALL_SKILLS } from "../model/data/skill-groups";
import { Skill } from "../model/definitions/dragon-skills";
import { DragonSkills } from "../model/dragon-skills.entity";
import { DragonSkillsDto } from "../model/dto/dragon-skills.dto";
import { GetSkillsDto } from "../model/dto/get-skills.dto";
import { SkillDto } from "../model/dto/skill.dto";

@Injectable()
export class DragonSkillsService {

    constructor(
        @InjectRepository(DragonSkills)
        private dragonSkillsRepository: Repository<DragonSkills>,
        private errorService: ErrorService,
    ) {}

    getSkillName(name: string): string {
        return name.replace(/./, c => c.toLowerCase());
    }

    async create() {
        const skills: DragonSkillsDto = {};
        const dragonSkills = this.dragonSkillsRepository.create(skills);
    
        return await this.dragonSkillsRepository.save(dragonSkills);
    }

    async getSkills(dto: GetSkillsDto): Promise<SkillDto[]> {
        let skills: Skill[] = ALL_SKILLS;

        if (dto.minLevel) skills = skills.filter(skill => skill.level >= dto.minLevel);
        if (dto.maxLevel) skills = skills.filter(skill => skill.level <= dto.maxLevel);
        if (dto.requiredNature) skills = skills.filter(skill => skill.nature.includes(dto.requiredNature));

        return skills;
    }

    async learnSkill(skillName: string, dragon: DragonDto): Promise<DragonDto> {
        if (dragon.skillPoints < 1) this.errorService.throw('errors.insufficientSkillPoints');

        const skill = ALL_SKILLS.find(skill => skill.name === skillName);
        if (!skill) this.errorService.throw('errors.skillNotFound');
        if (skill.level > dragon.level) this.errorService.throw('errors.dragonTooYoung');
        if (!skill.nature.includes(dragon.nature)) this.errorService.throw('errors.natureMismatch');
        if (dragon.skills[this.getSkillName(skillName)] >= SKILL_DEVELOPMENT_LIMIT) this.errorService.throw('errors.skillLimitReached');

        dragon.skills[this.getSkillName(skillName)] += 1;
        dragon.skillPoints -= 1;
        await this.dragonSkillsRepository.save(dragon.skills);

        return dragon;
    }
}
