import { DragonNature } from "src/api/dragons/dragon/model/definitions/dragon-nature";

export interface Skill {
    name: string;
    level: number;
    nature: DragonNature[];
}
