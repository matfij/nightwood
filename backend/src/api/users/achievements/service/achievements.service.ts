import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "../../user/model/dto/user.dto";
import { ACHIEVEMENTS_ALL } from "../data/achievements";
import { Achievements } from "../model/achievements.entity";
import { AchievementDto } from "../model/dto/achievement.dto";
import { AchievementsDto } from "../model/dto/achievements.dto";

@Injectable()
export class AchievementsService {

    constructor(
        @InjectRepository(Achievements)
        private achievementsRepository: Repository<Achievements>
    ) {}

    async createAchievements(): Promise<AchievementsDto> {
        const achievements = await this.achievementsRepository.save({});
        return achievements;
    }

    async getUserAchievements(userId: number): Promise<AchievementsDto> {
        const achievements = await this.achievementsRepository.findOne(userId);
        return achievements;
    }

    async getAllAchievements(): Promise<AchievementDto[]> {
        return ACHIEVEMENTS_ALL;
    }
}
