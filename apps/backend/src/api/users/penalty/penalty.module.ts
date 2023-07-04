import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DateService } from "src/common/services/date.service";
import { ErrorService } from "src/common/services/error.service";
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
        PenaltyService,
        DateService,
        ErrorService,
    ],
    exports: [
        PenaltyService
    ],
})
export class PenaltyModule {}
