import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { DragonNature } from "../definitions/dragons";

export class DragonAdoptDto {

    @IsString()
    @ApiProperty()
    name: string;

    @IsEnum(DragonNature)
    @ApiProperty({ enum: DragonNature, enumName: 'DragonNature' })
    nature: DragonNature;
}
