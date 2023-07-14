import { GuildStructure } from "../../client/api";

export interface DisplayBuilding {
    name: string;
    type: GuildStructure;
    icon: string;
    level: number;
}
