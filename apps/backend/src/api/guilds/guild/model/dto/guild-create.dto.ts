import { ApiProperty } from "@nestjs/swagger";

export class GuildCreateDto {
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    tag: string;

    @ApiProperty()
    description: string;
}
