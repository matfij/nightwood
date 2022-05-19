import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DateService } from "src/common/services/date.service";
import { ErrorService } from "src/common/services/error.service";
import { Repository } from "typeorm";
import { Booster } from "../model/booster.entity";
import { Mixture } from "../model/mixture.entity";

@Injectable()
export class AlchemyService {

    constructor(
        @InjectRepository(Booster)
        private boosterRepository: Repository<Booster>,
        @InjectRepository(Mixture)
        private mixtureRepository: Repository<Mixture>,
        private dateService: DateService,
        private errorService: ErrorService,
    ) {}

}
