import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber } from "class-validator";

export class DragonEquipDto {

    @IsNumber()
    @ApiProperty()
    dragonId: number;

    @IsNumber()
    @ApiProperty()
    itemId: number;
}
