import { ExpeditionGuardianDto } from "../model/dto/expedition-guardian.dto";

export const GUARDIAN_ANNIVERSARY: ExpeditionGuardianDto = {
    uid: 'guardian-e0',
    name: 'Slyphora, Dragonoid',
    level: 25,
    strength: 20,
    dexterity: 10,
    endurance: 10,
    will: 5,
    luck: 0,
    skills: {
        deepWounds: 10,
        lifeLink: 1,
        rage: 10,
        block: 10,
        greatVigor: 25,
        inferialBlessing: 10,
        fireBolt: 10,
    },
    runes: [],
    boosterUid: null,
}

export const GUARDIAN_EVENT_1: ExpeditionGuardianDto = {
    uid: 'guardian-e1',
    name: 'Santaworks',
    level: 10,
    strength: 12,
    dexterity: 8,
    endurance: 10,
    will: 6,
    luck: 8,
    skills: {
        innerFlow: 6,
        greatVigor: 50,
        fireBolt: 6,
        iceBolt: 6,
        armorPenetration: 25,
        block: 25,
    },
    runes: [],
    boosterUid: null,
};
