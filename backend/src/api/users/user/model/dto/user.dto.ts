import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AchievementsDto } from "src/api/users/achievements/model/dto/achievements.dto";
import { UserRole } from "../definitions/users";

export class UserDto {

    @ApiPropertyOptional()
    id?: number;

    @ApiProperty()
    email?: string;

    @ApiPropertyOptional()
    password?: string;

    @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
    role?: UserRole;

    @ApiProperty()
    nickname?: string;

    @ApiPropertyOptional()
    achievements?: AchievementsDto;

    @ApiProperty()
    gold?: number;

    @ApiProperty()
    ownedDragons?: number;

    @ApiProperty()
    maxOwnedDragons?: number;

    @ApiProperty()
    isConfirmed?: boolean;

    @ApiPropertyOptional()
    actionToken?: string;

    @ApiPropertyOptional()
    actionTokenValidity?: number;

    @ApiPropertyOptional()
    mutedUntil?: number;

    @ApiPropertyOptional()
    bannedUnitl?: number;
}
