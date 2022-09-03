import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AchievementsDto } from "src/api/users/achievements/model/dto/achievements.dto";
import { UserRole } from "../definitions/user-role";

export class UserPublicDto {

    @ApiPropertyOptional()
    id?: number;

    @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
    role?: UserRole;

    @ApiProperty()
    nickname?: string;

    @ApiPropertyOptional()
    achievements?: AchievementsDto;

    @ApiProperty()
    gold?: number;

    @ApiPropertyOptional()
    mutedUntil?: number;

    @ApiPropertyOptional()
    bannedUnitl?: number;
}
