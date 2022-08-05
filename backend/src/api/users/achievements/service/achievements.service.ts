import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Achievements } from "../model/achievements.entity";

@Injectable()
export class AchievementsService {

    constructor(
        @InjectRepository(Achievements)
        private achievements: Repository<Achievements>
    ) {}
}
