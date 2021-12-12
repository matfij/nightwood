import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { DragonNature } from "../definitions/dragon-nature";

export class CreateDragonDto {

    @IsString()
    @ApiProperty()
    name: string;

    @IsEnum(DragonNature)
    @ApiProperty({ enum: DragonNature, enumName: 'DragonNature' })
    nature: DragonNature;
}
