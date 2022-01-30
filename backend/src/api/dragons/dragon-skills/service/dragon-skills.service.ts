import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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
    ) {}

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
}
