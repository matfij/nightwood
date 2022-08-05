import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AchievementsController } from "./achievements.controller";
import { Achievements } from "./model/achievements.entity";
import { AchievementsService } from "./service/achievements.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Achievements]),
    ],
    controllers: [
        AchievementsController
    ],
    providers: [
        AchievementsService
    ],
    exports: [
        AchievementsService
    ],
})
export class AchievementsModule {}
