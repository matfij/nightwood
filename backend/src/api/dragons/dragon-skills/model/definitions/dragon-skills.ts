import { DragonNature } from "src/api/dragons/dragon/model/definitions/dragon-nature";

export interface Skill {
    uid: string;
    name: string;
    hint: string;
    level: number;
    requiredNature: DragonNature[];
}
