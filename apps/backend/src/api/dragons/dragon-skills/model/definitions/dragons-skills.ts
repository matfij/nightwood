import { DragonNature } from "src/api/dragons/dragon/model/definitions/dragons";

export interface Skill {
    uid: string;
    name: string;
    hint: string;
    level: number;
    requiredNature: DragonNature[];

    castChance?: number;
    castMana?: number;
}
