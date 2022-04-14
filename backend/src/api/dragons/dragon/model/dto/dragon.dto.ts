import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { DragonActionDto } from "src/api/dragons/dragon-action/model/dto/dragon-action.dto";
import { DragonSkillsDto } from "src/api/dragons/dragon-skills/model/dto/dragon-skills.dto";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";
import { DragonNature } from "../definitions/dragon-nature";

export class DragonDto {

    @Expose()
    @ApiProperty()
    id: number;

    @Expose()
    @ApiPropertyOptional()
    ownerId?: number;

    @Expose()
    @ApiProperty()
    action: DragonActionDto;

    @Expose()
    @ApiProperty()
    skills: DragonSkillsDto;

    @Expose()
    @ApiProperty({ type: [ItemDto] })
    runes: ItemDto[];
    
    @Expose()
    @ApiProperty()
    name: string;

    @Expose()
    @ApiProperty()
    skillPoints: number;

    @Expose()
    @ApiProperty()
    nextFeed: number;

    @Expose()
    @ApiProperty({ enum: DragonNature, enumName: 'DragonNature' })
    nature: DragonNature;

    @Expose()
    @ApiProperty()
    level: number;

    @Expose()
    @ApiProperty()
    stamina: number;

    @Expose()
    @ApiProperty()
    experience: number;

    @Expose()
    @ApiProperty()
    strength: number;

    @Expose()
    @ApiProperty()
    dexterity: number;

    @Expose()
    @ApiProperty()
    endurance: number;

    @Expose()
    @ApiProperty()
    will: number;

    @Expose()
    @ApiProperty()
    luck: number;
}
