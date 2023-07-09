import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRole } from "../../../user/model/definitions/users";

export class UserAuthDto {

    @ApiProperty()
    id: number;

    @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
    role?: UserRole;

    @ApiPropertyOptional()
    email?: string;

    @ApiProperty()
    nickname: string;

    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    refreshToken: string;

    @ApiPropertyOptional({ type: Date })
    expires?: string;
    
    @ApiProperty()
    gold?: number;

    @ApiProperty()
    eter?: number;

    @ApiProperty()
    ownedDragons?: number;

    @ApiProperty()
    maxOwnedDragons?: number;

    @ApiPropertyOptional()
    bannedUnitl?: number;

    @ApiPropertyOptional()
    mutedUntil?: number;
}
