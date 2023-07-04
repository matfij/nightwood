import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { DragonNature } from "../definitions/dragons";

export class DragonRenameDto {

    @IsNumber()
    @ApiProperty()
    dragonId: number;
    
    @IsString()
    @ApiProperty()
    newName: string;
}

export class DragonChangeNatureDto {

    @IsNumber()
    @ApiProperty()
    dragonId: number;
    
    @IsString()
    @ApiProperty({ enum: DragonNature, enumName: 'DragonNature' })
    newNature: DragonNature;
}
