import { ExpeditionGuardianDto } from "../model/dto/expedition-guardian.dto";

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
