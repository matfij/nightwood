import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UserDto {

    @ApiPropertyOptional()
    id?: number;

    @ApiProperty()
    email?: string;

    @ApiPropertyOptional()
    password?: string;

    @ApiProperty()
    nickname?: string;

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
}
