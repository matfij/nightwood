import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDragonDto {

    @ApiProperty()
    @IsString()
    name: string;
}
