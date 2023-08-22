import { Skill } from '../model/definitions/dragons-skills';

/**
 * Level 1
 */

export const InnateSpeed: Skill = {
    uid: 'innateSpeed',
    name: 'Innate Speed',
    hint: 'Increases the base speed',
    level: 1,
    requiredNature: [],
};

export const InnerFlow: Skill = {
    uid: 'innerFlow',
    name: 'Inner Flow',
    hint: 'Increases maximum mana and grants mana regenerations',
    level: 1,
    requiredNature: [],
};

export const LuckyStrike: Skill = {
    uid: 'luckyStrike',
    name: 'Lucky Strike',
    hint: 'Increases critical strike chance',
    level: 1,
    requiredNature: [],
};

export const GreatVigor: Skill = {
    uid: 'greatVigor',
    name: 'Great Vigor',
    hint: 'Increases maximum health',
    level: 1,
    requiredNature: [],
};

/**
 * Level 10
 */

export const ThoughtfulStrike: Skill = {
    uid: 'thoughtfulStrike',
    name: 'Thoughtful Strike',
    hint: 'Decreases enemy dodge chance',
    level: 10,
    requiredNature: [],
};

export const BeginnersLuck: Skill = {
    uid: 'beginnersLuck',
    name: 'Beginners Luck',
    hint: 'Increases the amount of gold from expeditions',
    level: 10,
    requiredNature: [],
};

export const MagicArrow: Skill = {
    uid: 'magicArrow',
    name: 'Magic Arrow',
    hint: 'Enables a dragon to cast magic arrows that reduce magic resistance. Base mana cost: 10, grows with skill level.',
    level: 10,
    requiredNature: [],
    castChance: 0.25,
    castMana: 10,
};

/**
 * Level 30
 */

export const Block: Skill = {
    uid: 'block',
    name: 'Block',
    hint: 'Gives a chance to block large part of incoming damage',
    level: 30,
    requiredNature: [],
};

export const ArmorPenetration: Skill = {
    uid: 'armorPenetration',
    name: 'Armor Penetration',
    hint: 'Gives a chance to completely penetrate enemy armor',
    level: 30,
    requiredNature: [],
};

export const Rage: Skill = {
    uid: 'rage',
    name: 'Rage',
    hint: 'Increases dragon damage when low on health',
    level: 30,
    requiredNature: [],
};

/**
 * Level 60
 */

export const Dodge: Skill = {
    uid: 'dodge',
    name: 'Dodge',
    hint: 'Increases dragon dodge chance',
    level: 60,
    requiredNature: [],
};

export const TreasureHunter: Skill = {
    uid: 'treasureHunter',
    name: 'Treasure Hunter',
    hint: 'Allows dragon to find more loot during expeditions',
    level: 60,
    requiredNature: [],
};

export const LethalBlow: Skill = {
    uid: 'lethalBlow',
    name: 'Lethal Blow',
    hint: 'Gives chance to double critical power.',
    level: 60,
    requiredNature: [],
};

/**
 * Level 100
 */

export const Conserve: Skill = {
    uid: 'conserve',
    name: 'Conserve',
    hint: 'Reduces mana usage.',
    level: 100,
    requiredNature: [],
};

export const Counterattack: Skill = {
    uid: 'counterattack',
    name: 'Counterattack',
    hint: 'Gives a chance to perform a counterattack after receiving special attack.',
    level: 100,
    requiredNature: [],
};

export const HeavyImpact: Skill = {
    uid: 'heavyImpact',
    name: 'Heavy Impact',
    hint: 'Increases the critical power.',
    level: 100,
    requiredNature: [],
};
