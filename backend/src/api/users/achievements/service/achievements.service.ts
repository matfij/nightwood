import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DragonDto } from "src/api/dragons/dragon/model/dto/dragon.dto";
import { Repository } from "typeorm";
import { User } from "../../user/model/user.entity";
import { ACHIEVEMENTS_ALL, ACHIEVEMENTS_CROESUS, ACHIEVEMENTS_CURIOUS_EXPLORER, ACHIEVEMENTS_DRAGON_OWNER, ACHIEVEMENTS_DRAGON_TRAINER, ACHIEVEMENTS_PERSISTENT_BREEDER } from "../data/achievements";
import { Achievements } from "../model/achievements.entity";
import { AchievementDto } from "../model/dto/achievement.dto";
import { AchievementsDto } from "../model/dto/achievements.dto";

@Injectable()
export class AchievementsService {

    constructor(
        @InjectRepository(Achievements)
        private achievementsRepository: Repository<Achievements>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async createAchievements(): Promise<AchievementsDto> {
        const achievements = await this.achievementsRepository.save({});
        return achievements;
    }

    async getUserAchievements(userId: number): Promise<AchievementsDto> {
        const user = await this.getUserData(userId);
        return user.achievements;
    }

    async getUserPublicAchievements(publicUserId: number): Promise<AchievementsDto> {
        const user = await this.getUserData(publicUserId);
        return user.achievements;
    }

    async getAllAchievements(): Promise<AchievementDto[]> {
        return ACHIEVEMENTS_ALL;
    }

    private async getUserData(userId: number, relations: string[] = []) {
        const user = await this.userRepository.findOne(userId, { relations: ['achievements', ...relations] });
        return user;
    }

    async checkDragonOwnerAchievements(userId: number) {
        const user = await this.getUserData(userId);

        let achievementsChanged = false;
        ACHIEVEMENTS_DRAGON_OWNER.forEach(achievement => {
            if (user.ownedDragons >= achievement.requiredPoints && user.achievements.dragonOwner < achievement.tier) {
                user.achievements.dragonOwner = achievement.tier;
                achievementsChanged = true;
            }
        });

        if (achievementsChanged) {
            await this.achievementsRepository.save(user.achievements);
        }
    }

    async checkPersistentBreederAchievements(userId:number, dragon: DragonDto) {
        const user = await this.getUserData(userId);

        let achievementsChanged = false;
        ACHIEVEMENTS_PERSISTENT_BREEDER.forEach(achievement => {
            if (dragon.level >= achievement.requiredPoints && user.achievements.persistentBreeder < achievement.tier) {
                user.achievements.persistentBreeder = achievement.tier;
                achievementsChanged = true;
            }
        });

        if (achievementsChanged) {
            await this.achievementsRepository.save(user.achievements);
        }
    }

    async checkDragonTrainerAchievements(userId: number, dragon: DragonDto) {
        const user = await this.getUserData(userId);

        let achievementsChanged = false;
        ACHIEVEMENTS_DRAGON_TRAINER.forEach(achievement => {
            if (dragon.experience >= achievement.requiredPoints && user.achievements.dragonTrainer < achievement.tier) {
                user.achievements.dragonTrainer = achievement.tier;
                achievementsChanged = true;
            }
        });

        if (achievementsChanged) {
            await this.achievementsRepository.save(user.achievements);
        }
    }

    async checkCuriousExplorerAchievements(userId: number, gainedTime: number = 0) {
        const user = await this.getUserData(userId);
        user.achievements.expeditionTime += Math.round(gainedTime);

        ACHIEVEMENTS_CURIOUS_EXPLORER.forEach(achievement => {
            if (user.achievements.expeditionTime >= achievement.requiredPoints) {
                user.achievements.curiousExplorer = achievement.tier;
            }
        });

        await this.achievementsRepository.save(user.achievements);
    }

    async checkCroesusAchievements(userId: number) {
        const user = await this.getUserData(userId);

        let achievementsChanged = false;
        ACHIEVEMENTS_CROESUS.forEach(achievement => {
            if (user.gold >= achievement.requiredPoints && user.achievements.croesus < achievement.tier) {
                user.achievements.croesus = achievement.tier;
                achievementsChanged = true;
            }
        });

        if (achievementsChanged) {
            await this.achievementsRepository.save(user.achievements);
        }
    }
}
