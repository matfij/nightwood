import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DragonSkillsController } from './dragon-skills.controller';
import { DragonSkills } from './model/dragon-skills.entity';
import { DragonSkillsService } from './service/dragon-skills.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([DragonSkills]),
    ],
    controllers: [
        DragonSkillsController,
    ],
    providers: [
        DragonSkillsService,
    ],
    exports: [
        DragonSkillsService,
    ]
})
export class DragonSkillsModule {}
