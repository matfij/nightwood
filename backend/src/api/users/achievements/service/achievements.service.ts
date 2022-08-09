import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DragonDto } from "src/api/dragons/dragon/model/dto/dragon.dto";
import { Repository } from "typeorm";
import { UserDto } from "../../user/model/dto/user.dto";
import { User } from "../../user/model/user.entity";
import { ACHIEVEMENTS_ALL, DRAGON_OWNER_I, DRAGON_OWNER_II, DRAGON_OWNER_III, DRAGON_TRAINER_I, DRAGON_TRAINER_II, DRAGON_TRAINER_III, PERSISTENT_BREEDER_I, PERSISTENT_BREEDER_II, PERSISTENT_BREEDER_III } from "../data/achievements";
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
        if (user.ownedDragons >= DRAGON_OWNER_I.requiredPoints && !user.achievements.dragonOwnerI) {
            user.achievements.dragonOwnerI = true;
            achievementsChanged = true;
        }
        if (user.ownedDragons >= DRAGON_OWNER_II.requiredPoints && !user.achievements.dragonOwnerII) {
            user.achievements.dragonOwnerII = true;
            achievementsChanged = true;
        }
        if (user.ownedDragons >= DRAGON_OWNER_III.requiredPoints && !user.achievements.dragonOwnerIII) {
            user.achievements.dragonOwnerIII = true;
            achievementsChanged = true;
        }

        if (achievementsChanged) {
            await this.achievementsRepository.save(user.achievements);
        }
    }

    async checkPersistentBreederAchievements(userId:number, dragon: DragonDto) {
        const user = await this.getUserData(userId);

        let achievementsChanged = false;
        if (dragon.level >= PERSISTENT_BREEDER_I.requiredPoints && !user.achievements.persistentBreederI) {
            user.achievements.persistentBreederI = true;
            achievementsChanged = true;
        }
        if (dragon.level >= PERSISTENT_BREEDER_II.requiredPoints && !user.achievements.persistentBreederII) {
            user.achievements.persistentBreederII = true;
            achievementsChanged = true;
        }
        if (dragon.level >= PERSISTENT_BREEDER_III.requiredPoints && !user.achievements.persistentBreederIII) {
            user.achievements.persistentBreederIII = true;
            achievementsChanged = true;
        }

        if (achievementsChanged) {
            await this.achievementsRepository.save(user.achievements);
        }
    }

    async checkDragonTrainerAchievements(userId: number, dragon: DragonDto) {
        const user = await this.getUserData(userId);

        let achievementsChanged = false;
        if (dragon.experience >= DRAGON_TRAINER_I.requiredPoints && !user.achievements.dragonTrainerI) {
            user.achievements.dragonTrainerI = true;
            achievementsChanged = true;
        }
        if (dragon.experience >= DRAGON_TRAINER_II.requiredPoints && !user.achievements.dragonTrainerII) {
            user.achievements.dragonTrainerII = true;
            achievementsChanged = true;
        }
        if (dragon.experience >= DRAGON_TRAINER_III.requiredPoints && !user.achievements.dragonTrainerIII) {
            user.achievements.dragonTrainerIII = true;
            achievementsChanged = true;
        }

        if (achievementsChanged) {
            await this.achievementsRepository.save(user.achievements);
        }
    }
}
