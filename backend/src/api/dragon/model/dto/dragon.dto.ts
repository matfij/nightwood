import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class DragonDto {

    @ApiPropertyOptional()
    id?: number;

    @ApiProperty()
    name: string;
}
