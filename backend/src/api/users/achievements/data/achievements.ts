import { Achievement } from '../model/definitions/achievement';

export const DRAGON_OWNER_I: Achievement = {
    uid: 'dragonOwnerI',
    name: 'Dragon owner',
    hint: 'Adopt your first dragon.',
    requiredPoints: 1,
};

export const DRAGON_OWNER_II: Achievement = {
    uid: 'dragonOwnerII',
    name: 'Dragon sympathizer',
    hint: 'Have at least 3 dragons.',
    requiredPoints: 3,
};

export const DRAGON_OWNER_III: Achievement = {
    uid: 'dragonOwnerIII',
    name: 'Dragon fan',
    hint: 'Have at least 5 dragons.',
    requiredPoints: 5,
};

export const PERSISTENT_BREEDER_I: Achievement = {
    uid: 'persistentBreederI',
    name: 'Keen breeder',
    hint: 'One of your dragons reached [10] level of maturity.',
    requiredPoints: 10,
};

export const PERSISTENT_BREEDER_II: Achievement = {
    uid: 'persistentBreederII',
    name: 'Persistent breeder',
    hint: 'One of your dragons reached [50] level of maturity.',
    requiredPoints: 50,
};

export const PERSISTENT_BREEDER_III: Achievement = {
    uid: 'persistentBreederIII',
    name: 'Tireless breeder',
    hint: 'One of your dragons reached [100] level of maturity.',
    requiredPoints: 100,
};

export const CURIOUS_EXPLORER_I: Achievement = {
    uid: 'curiousExplorerI',
    name: 'Curious explorer',
    hint: 'Your dragons have spent 100 hours on expeditions.',
    requiredPoints: 100,
};

export const CURIOUS_EXPLORER_II: Achievement = {
    uid: 'curiousExplorerII',
    name: 'Cartographer',
    hint: 'Your dragons have spent 1000 hours on expeditions.',
    requiredPoints: 1000,
};

export const CURIOUS_EXPLORER_III: Achievement = {
    uid: 'curiousExplorerIII',
    name: 'Great conqueror',
    hint: 'Your dragons have spent 3000 hours on expeditions.',
    requiredPoints: 3000,
};

export const DRAGON_TRAINER_I: Achievement = {
    uid: 'dragonTrainerI',
    name: 'Greenhorn',
    hint: 'One of yout dragons collected 500 experience points.',
    requiredPoints: 500,
};

export const DRAGON_TRAINER_II: Achievement = {
    uid: 'dragonTrainerII',
    name: 'Rising star',
    hint: 'One of yout dragons collected 2500 experience points.',
    requiredPoints: 2500,
};

export const DRAGON_TRAINER_III: Achievement = {
    uid: 'dragonTrainerIII',
    name: 'Undefeated',
    hint: 'One of yout dragons collected 10000 experience points.',
    requiredPoints: 10000,
};

export const CROESUS_I: Achievement = {
    uid: 'croesusI',
    name: 'Bargain collector',
    hint: 'Gather 1000 gold.',
    requiredPoints: 1000,
};

export const CROESUS_II: Achievement = {
    uid: 'croesusII',
    name: 'Agile trader',
    hint: 'Gather 10000 gold.',
    requiredPoints: 10000,
};

export const CROESUS_III: Achievement = {
    uid: 'croesusIII',
    name: 'Croesus',
    hint: 'Gather 100000 gold.',
    requiredPoints: 100000,
};

export const ACHIEVEMENTS_ALL: Achievement[] = [
    DRAGON_OWNER_I,
    DRAGON_OWNER_II,
    DRAGON_OWNER_III,
    PERSISTENT_BREEDER_I,
    PERSISTENT_BREEDER_II,
    PERSISTENT_BREEDER_III,
    CURIOUS_EXPLORER_I,
    CURIOUS_EXPLORER_II,
    CURIOUS_EXPLORER_III,
    DRAGON_TRAINER_I,
    DRAGON_TRAINER_II,
    DRAGON_TRAINER_III,
    CROESUS_I,
    CROESUS_II,
    CROESUS_III,
];
