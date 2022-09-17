import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "../../user/model/dto/user.dto";
import { Penalty } from "../model/penalty.entity";

@Injectable()
export class PenaltyService {

    constructor(
        @InjectRepository(Penalty)
        private penaltyRepository: Repository<Penalty>,
    ) {}

    async imposePenalty(user: UserDto): Promise<void> {
        
    }
}
