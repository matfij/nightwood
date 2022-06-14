import { ExpeditionGuardianDto } from "../definitions/guardian";
import { ANDREW_FOREST } from "./expeditions";

const GUARDIAN_GOBLIN_ARCHMAGE: ExpeditionGuardianDto = {
    uid: 'guardian-1',
    expeditionUid: ANDREW_FOREST.uid,
    name: 'Goblin Archmage',
    level: 10,
    strength: 10,
    dexterity: 10,
    endurance: 10,
    will: 10,
    luck: 10,
    skills: {
        airVector: 10,
        fireBolt: 10,
        iceBolt: 10,
        rockBlast: 10,
    },
    runes: [],
    boosterUid: null,
};

export const EXPEDITION_GUARDIANS: ExpeditionGuardianDto[] = [
    GUARDIAN_GOBLIN_ARCHMAGE,
];
