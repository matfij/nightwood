import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";
import { DragonNature } from "../definitions/dragons";

export class DragonSummonActionDto {

    @ApiProperty()
    uid: string;

    @ApiProperty()
    hint: string;

    @IsString()
    @ApiProperty({ enum: DragonNature, enumName: 'DragonNature' })
    nature: DragonNature;

    @ApiProperty()
    cost: number;

    @ApiProperty({ type: [ItemDto] })
    requiredItems: ItemDto[];
}

export class DragonSummonDto {

    @IsString()
    @ApiProperty()
    actionUid: string;

    @IsString()
    @ApiProperty()
    name: string;
    
    @IsString()
    @ApiProperty({ enum: DragonNature, enumName: 'DragonNature' })
    nature: DragonNature;
}
