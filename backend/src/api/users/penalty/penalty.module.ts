import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/model/user.entity";
import { Penalty } from "./model/penalty.entity";
import { PenaltyController } from "./penalty.controller";
import { PenaltyService } from "./service/penalty.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Penalty, User]),
    ],
    controllers: [
        PenaltyController
    ],
    providers: [
        PenaltyService
    ],
    exports: [
        PenaltyService
    ],
})
export class PenaltyModule {}
