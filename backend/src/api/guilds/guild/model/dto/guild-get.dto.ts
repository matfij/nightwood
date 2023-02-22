import { ApiProperty } from "@nestjs/swagger";

export class GuildGetDto {

    @ApiProperty()
    page: number;
    
    @ApiProperty()
    limit: number;
}
