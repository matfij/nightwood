import { ExpeditionGuardianDto } from "../model/dto/expedition-guardian.dto";

export const GUARDIAN_FOREST: ExpeditionGuardianDto = {
    uid: 'guardian-1',
    name: 'Lord of the elements',
    level: 10,
    strength: 5,
    dexterity: 5,
    endurance: 10,
    will: 10,
    luck: 1,
    skills: {
        innerFlow: 5,
        greatVigor: 60,
        magicArrow: 7,
        airVector: 7,
        fireBolt: 7,
        iceBolt: 7,
        rockBlast: 7,
        terribleOmen: 21,
    },
    runes: [],
    boosterUid: null,
};

export const GUARDIAN_DESERT: ExpeditionGuardianDto = {
    uid: 'guardian-2',
    name: 'Tyrrajnitos',
    level: 30,
    strength: 35,
    dexterity: 15,
    endurance: 25,
    will: 10,
    luck: 5,
    skills: {
        roughSkin: 10,
        soundBody: 25,
        block: 10,
        greatVigor: 90,
    },
    runes: [],
    boosterUid: null,
};

export const GUARDIAN_MOUNTAINS: ExpeditionGuardianDto = {
    uid: 'guardian-3',
    name: 'Yethnoshik the Great',
    level: 30,
    strength: 25,
    dexterity: 20,
    endurance: 20,
    will: 10,
    luck: 25,
    skills: {
        greatVigor: 75,
        armorPenetration: 25,
        rage: 50,
        thoughtfulStrike: 10,
        pugnaciousStrike: 10,
    },
    runes: [],
    boosterUid: null,
};

export const GUARDIAN_ISLANDS: ExpeditionGuardianDto = {
    uid: 'guardian-4',
    name: 'Sinus Vectro',
    level: 60,
    strength: 40,
    dexterity: 40,
    endurance: 40,
    will: 40,
    luck: 30,
    skills: {
        innerFlow: 10,
        lifeLink: 20,
        staticStrike: 20,
        greatVigor: 100,
        block: 5,
        thunderbolt: 10,
        iceBolt: 10,
        freeze: 15,
    },
    runes: [],
    boosterUid: null,
};

export const EXPEDITION_GUARDIANS: ExpeditionGuardianDto[] = [
    GUARDIAN_FOREST,
    GUARDIAN_DESERT,
    GUARDIAN_MOUNTAINS,
    GUARDIAN_ISLANDS,
];
