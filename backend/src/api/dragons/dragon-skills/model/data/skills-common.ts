import { Skill } from "../definitions/dragon-skills";

/**
 * Level 1
 */
export const InnateSpeed: Skill = {
    uid: 'innateSpeed',
    name: 'Innate Speed',
    hint: 'Increases the base speed',
    level: 1,
    requiredNature: [],
}

export const InnerFlow: Skill = {
    uid: 'innerFlow',
    name: 'Inner Flow',
    hint: 'Increases maximum mana and grants mana regenerations',
    level: 1,
    requiredNature: [],
}

export const LuckyStrike: Skill = {
    uid: 'luckyStrike',
    name: 'Lucky Strike',
    hint: 'Increases critical strike chance',
    level: 1,
    requiredNature: [],
}

export const GreatVigor: Skill = {
    uid: 'greatVigor',
    name: 'Great Vigor',
    hint: 'Increases maximum health',
    level: 1,
    requiredNature: [],
}

/**
 * Level 10
 */
export const ThoughtfulStrike: Skill = {
    uid: 'thoughtfulStrike',
    name: 'Thoughtful Strike',
    hint: 'Decreases enemy dodge chance',
    level: 10,
    requiredNature: [],
}

 export const BeginnersLuck: Skill = {
    uid: 'beginnersLuck',
    name: 'Beginners Luck',
    hint: 'Increases the amount of gold from expeditions',
    level: 10,
    requiredNature: [],
}

export const MagicArrow: Skill = {
    uid: 'magicArrow',
    name: 'Magic Arrow',
    hint: 'Enables the dragon to cast magic arrows (require mana)',
    level: 10,
    requiredNature: [],
    castChance: 0.25,
    castMana: 10,
}

/**
 * Level 30
 */
export const Block: Skill = {
    uid: 'block',
    name: 'Block',
    hint: 'Gives a chance to block large part of incoming damage',
    level: 30,
    requiredNature: [],
}

export const ArmorPenetration: Skill = {
    uid: 'armorPenetration',
    name: 'Armor Penetration',
    hint: 'Gives a chance to completely penetrate enemy armor',
    level: 30,
    requiredNature: [],
}

export const Rage: Skill = {
    uid: 'rage',
    name: 'Rage',
    hint: 'Increases dragon damage when low on health',
    level: 30,
    requiredNature: [],
}
