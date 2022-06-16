import { ApiProperty } from "@nestjs/swagger";
import { DragonSkillsDto } from "src/api/dragons/dragon-skills/model/dto/dragon-skills.dto";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";

export class ExpeditionGuardianDto {

    @ApiProperty()
    uid: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    level: number;

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

    @ApiProperty()
    skills: DragonSkillsDto;

    @ApiProperty()
    runes: ItemDto[];

    @ApiProperty()
    boosterUid: string;
}
