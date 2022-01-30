import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DragonSkills } from "../model/dragon-skills.entity";
import { DragonSkillsDto } from "../model/dto/dragon-skills.dto";

@Injectable()
export class DragonSkillsService {

    constructor(
        @InjectRepository(DragonSkills)
        private dragonSkillsRepository: Repository<DragonSkills>,
    ) {}

    async create() {
        const skills: DragonSkillsDto = {
            // DEFAULT SKILLS
        };
        const dragonSkills = this.dragonSkillsRepository.create(skills);
    
        return await this.dragonSkillsRepository.save(dragonSkills);
      }
}
