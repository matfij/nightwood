import { ExpeditionGuardianDto } from "../definitions/guardian";

export const GUARDIAN_GOBLIN_ARCHMAGE: ExpeditionGuardianDto = {
    uid: 'guardian-1',
    name: 'Goblin Archmage',
    level: 10,
    strength: 5,
    dexterity: 5,
    endurance: 10,
    will: 10,
    luck: 5,
    skills: {
        innerFlow: 10,
        greatVigor: 30,
        magicArrow: 10,
        airVector: 10,
        fireBolt: 10,
        iceBolt: 10,
        rockBlast: 10,
    },
    runes: [],
    boosterUid: null,
};

export const GUARDIAN_SAND_GOLEM: ExpeditionGuardianDto = {
    uid: 'guardian-2',
    name: 'Sand golem',
    level: 30,
    strength: 25,
    dexterity: 15,
    endurance: 30,
    will: 15,
    luck: 15,
    skills: {
        roughSkin: 10,
        soundBody: 25,
        greatVigor: 60,
    },
    runes: [],
    boosterUid: null,
};

export const EXPEDITION_GUARDIANS: ExpeditionGuardianDto[] = [
    GUARDIAN_GOBLIN_ARCHMAGE,
    GUARDIAN_SAND_GOLEM,
];
