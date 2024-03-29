import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { DragonActionDto } from "src/api/dragons/dragon-action/model/dto/dragon-action.dto";
import { DragonSkillsDto } from "src/api/dragons/dragon-skills/model/dto/dragon-skills.dto";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { DragonNature } from "../definitions/dragons";

export class DragonDto {

    @ApiProperty()
    id: number;

    @ApiPropertyOptional()
    userId?: number;

    @ApiPropertyOptional()
    user?: Partial<UserDto>;

    @ApiProperty()
    action: DragonActionDto;

    @ApiProperty()
    skills: DragonSkillsDto;

    @ApiProperty( { type: [ItemDto] })
    runes: ItemDto[];

    @ApiProperty()
    boosterUid?: string;

    @ApiProperty()
    booster?: ItemDto;

    @ApiProperty({ type: [Number] })
    battledWith: number[];

    @ApiProperty({ type: [String] })
    unlockedExpeditions: string[];
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    skillPoints: number;

    @ApiProperty()
    nextFeed: number;

    @ApiProperty({ enum: DragonNature, enumName: 'DragonNature' })
    nature: DragonNature;

    @ApiProperty()
    level: number;

    @ApiProperty()
    stamina: number;

    @ApiProperty()
    experience: number;

    @ApiProperty()
    seasonalExperience: number;

    @ApiProperty()
    strength: number;

    @ApiProperty()
    dexterity: number;

    @ApiProperty()
    endurance: number;

    @ApiProperty()
    will: number;

    @ApiProperty()
    luck: number;
}
