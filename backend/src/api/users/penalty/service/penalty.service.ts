import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DateService } from "src/common/services/date.service";
import { ErrorService } from "src/common/services/error.service";
import { BAN_MAX_TIME, BAN_MIN_TIME, MUTE_MAX_TIME, MUTE_MIN_TIME, PENALTY_COMMENT_MAX_LENGTH } from "src/configuration/backend.config";
import { Repository } from "typeorm";
import { UserRole } from "../../user/model/definitions/users";
import { UserDto } from "../../user/model/dto/user.dto";
import { User } from "../../user/model/user.entity";
import { PenaltyType } from "../model/definitions/penalties";
import { PenaltyImposeDto } from "../model/dto/penalty-impose.dto";
import { Penalty } from "../model/penalty.entity";

@Injectable()
export class PenaltyService {

    constructor(
        @InjectRepository(Penalty)
        private penaltyRepository: Repository<Penalty>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private dateService: DateService,
        private errorService: ErrorService,
    ) {}

    async imposePenalty(user: UserDto, dto: PenaltyImposeDto): Promise<void> {
        const imposingUser = await this.userRepository.findOne(user.id);
        const punishedUser = await this.userRepository.findOne(dto.punishedUserId);
        
        if (!imposingUser || !punishedUser) this.errorService.throw('errors.userNotFound');
        if (imposingUser.role === UserRole.Moderator && punishedUser.role === UserRole.Administrator) this.errorService.throw('errors.insufficientPermissions');
        if (imposingUser.role === UserRole.Moderator && dto.type === PenaltyType.Ban) this.errorService.throw('errors.insufficientPermissions');
        if (dto.type === PenaltyType.Ban && !this.dateService.checkIfNextEventAvailable(punishedUser.bannedUnitl)) this.errorService.throw('errors.alreadyBanned');
        if (dto.type === PenaltyType.Mute && !this.dateService.checkIfNextEventAvailable(punishedUser.mutedUntil)) this.errorService.throw('errors.alreadyMuted');
        if (dto.type === PenaltyType.Ban && (BAN_MIN_TIME > dto.duration || BAN_MAX_TIME < dto.duration)) this.errorService.throw('errors.incorrectPenaltyDuration');
        if (dto.type === PenaltyType.Mute && (MUTE_MIN_TIME > dto.duration || MUTE_MAX_TIME < dto.duration)) this.errorService.throw('errors.incorrectPenaltyDuration');
        if (dto.message.length > PENALTY_COMMENT_MAX_LENGTH) this.errorService.throw('errors.commentTooLong');

        const penaltyEndTime = this.dateService.getFutureDate(0, dto.duration);
        switch(dto.type) {
            case PenaltyType.Ban: {
                this.userRepository.update(punishedUser.id, { bannedUnitl: penaltyEndTime });
                break; 
            }
            case PenaltyType.Mute: {
                this.userRepository.update(punishedUser.id, { mutedUntil: penaltyEndTime }); 
                break;
            }
        }

        const penalty: Penalty = {
            imposingUserId: imposingUser.id,
            punishedUserId: punishedUser.id,
            type: dto.type,
            duration: dto.duration,
            message: dto.message,
            comment: dto.comment,
        };
        this.penaltyRepository.save(penalty);
    }
}
