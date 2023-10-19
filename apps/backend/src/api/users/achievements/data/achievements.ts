import { Achievement } from '../model/definitions/achievement';

export const ACHIEVEMENTS_DRAGON_OWNER: Achievement[]= [
    {
        uid: 'dragonOwner',
        name: 'Dragon owner',
        tier: 1,
        hint: 'Adopt your first dragon.',
        requiredPoints: 1,
    },
    {
        uid: 'dragonOwner',
        name: 'Dragon sympathizer',
        tier: 2,
        hint: 'Have at least 3 dragons.',
        requiredPoints: 3,
    },
    {
        uid: 'dragonOwner',
        name: 'Dragon fan',
        tier: 3,
        hint: 'Have at least 5 dragons.',
        requiredPoints: 5,
    },
];

export const ACHIEVEMENTS_PERSISTENT_BREEDER: Achievement[] = [
    {
        uid: 'persistentBreeder',
        name: 'Keen breeder',
        tier: 1,
        hint: 'One of your dragons reached [10] level of maturity.',
        requiredPoints: 10,
    },
    {
        uid: 'persistentBreeder',
        name: 'Persistent breeder',
        tier: 2,
        hint: 'One of your dragons reached [50] level of maturity.',
        requiredPoints: 50,
    },
    {
        uid: 'persistentBreeder',
        name: 'Tireless breeder',
        tier: 3,
        hint: 'One of your dragons reached [100] level of maturity.',
        requiredPoints: 100,
    },
];

export const ACHIEVEMENTS_CURIOUS_EXPLORER: Achievement[] = [
    {
        uid: 'curiousExplorer',
        name: 'Curious explorer',
        tier: 1,
        hint: 'Your dragons have spent 100 hours on expeditions.',
        requiredPoints: 100,
    },
    {
        uid: 'curiousExplorer',
        name: 'Cartographer',
        tier: 2,
        hint: 'Your dragons have spent 1000 hours on expeditions.',
        requiredPoints: 1000,
    },
    {
        uid: 'curiousExplorer',
        name: 'Great conqueror',
        tier: 3,
        hint: 'Your dragons have spent 3000 hours on expeditions.',
        requiredPoints: 3000,
    },
];

export const ACHIEVEMENTS_DRAGON_TRAINER: Achievement[] = [
    {
        uid: 'dragonTrainer',
        name: 'Greenhorn',
        tier: 1,
        hint: 'One of your dragons collected 500 experience points.',
        requiredPoints: 500,
    },
    {
        uid: 'dragonTrainer',
        name: 'Rising star',
        tier: 2,
        hint: 'One of your dragons collected 2500 experience points.',
        requiredPoints: 2500,
    },
    {
        uid: 'dragonTrainer',
        name: 'Undefeated',
        tier: 3,
        hint: 'One of your dragons collected 10 000 experience points.',
        requiredPoints: 10000,
    },
];

export const ACHIEVEMENTS_CROESUS: Achievement[] = [
    {
        uid: 'croesus',
        name: 'Bargain collector',
        tier: 1,
        hint: 'Gather 1000 gold.',
        requiredPoints: 1000,
    },
    {
        uid: 'croesus',
        name: 'Agile trader',
        tier: 2,
        hint: 'Gather 10 000 gold.',
        requiredPoints: 10000,
    },
    {
        uid: 'croesus',
        name: 'Croesus',
        tier: 3,
        hint: 'Gather 100 000 gold.',
        requiredPoints: 100000,
    },
];

export const ACHIEVEMENTS_CHAMPION: Achievement[] = [
    {
        uid: 'champion',
        name: 'Winner',
        tier: 1,
        hint: 'Winner of the Seasonal Tournament.',
        requiredPoints: 1,
    },
    {
        uid: 'champion',
        name: 'Champion',
        tier: 2,
        hint: 'Triple winner of the Seasonal Tournament.',
        requiredPoints: 3,
    },
    {
        uid: 'champion',
        name: 'Legend',
        tier: 3,
        hint: 'Ten-time winner of the Season Tournaments.',
        requiredPoints: 12,
    },
];

export const ACHIEVEMENTS_ALL: Achievement[] = [
    ...ACHIEVEMENTS_DRAGON_OWNER,
    ...ACHIEVEMENTS_PERSISTENT_BREEDER,
    ...ACHIEVEMENTS_CURIOUS_EXPLORER,
    ...ACHIEVEMENTS_DRAGON_TRAINER,
    ...ACHIEVEMENTS_CROESUS,
    ...ACHIEVEMENTS_CHAMPION,
];
