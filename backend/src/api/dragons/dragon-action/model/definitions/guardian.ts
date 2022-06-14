import { DragonSkillsDto } from "src/api/dragons/dragon-skills/model/dto/dragon-skills.dto";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";

export class ExpeditionGuardianDto {
    uid: string;
    expeditionUid: string;
    name: string;
    level: number;
    strength: number;
    dexterity: number;
    endurance: number;
    will: number;
    luck: number;
    skills: DragonSkillsDto;
    runes: ItemDto[];
    boosterUid: string;
}
