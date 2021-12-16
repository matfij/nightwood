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
    ownedDragons?: number;

    @ApiProperty()
    maxOwnedDragons?: number;
}
