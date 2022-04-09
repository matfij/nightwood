import { DragonNature } from "src/api/dragons/dragon/model/definitions/dragon-nature";
import { Skill } from "../definitions/dragon-skills";

/**
 * Increases the base speed
 */
export const InnateSpeed: Skill = {
    uid: 'innateSpeed',
    name: 'Innate Speed',
    hint: 'Increases the base speed',
    level: 1,
    requiredNature: [],
}

/**
 * Increases maximum mana and mana regenerations
 */
export const InnerFlow: Skill = {
    uid: 'innerFlow',
    name: 'Inner Flow',
    hint: 'Increases maximum mana and mana regenerations',
    level: 1,
    requiredNature: [],
}

/**
 * Increases critical strike chance
 */
export const LuckyStrike: Skill = {
    uid: 'luckyStrike',
    name: 'Lucky Strike',
    hint: 'Increases critical strike chance',
    level: 1,
    requiredNature: [],
}

/**
 * Increases maximum health
 */
export const GreatVigor: Skill = {
    uid: 'greatVigor',
    name: 'Great Vigor',
    hint: 'Increases maximum health',
    level: 1,
    requiredNature: [],
}

/** 
 * Decreases enemy dodge chance
 */
export const ThoughtfulStrike: Skill = {
    uid: 'thoughtfulStrike',
    name: 'Thoughtful Strike',
    hint: 'Decreases enemy dodge chance',
    level: 10,
    requiredNature: [],
}

/** 
 * Increases expedition loots
 */
 export const BeginnersLuck: Skill = {
    uid: 'beginnersLuck',
    name: 'Beginners Luck',
    hint: 'Increases expedition loots',
    level: 10,
    requiredNature: [],
 }

/**
 * Attack has additional damage component
 */
export const FireBreath: Skill = {
    uid: 'fireBreath',
    name: 'Fire Breath',
    hint: 'Empowers base attack with fire component',
    level: 10,
    requiredNature: [DragonNature.Fire],
}

/**
 * Consecutive health regeneration
 */
export const SoundBody: Skill = {
    uid: 'soundBody',
    name: 'Sound Body',
    hint: 'Grants consecutive health regeneration',
    level: 10,
    requiredNature: [DragonNature.Water],
}

/**
 * Attacks breaks enemy armor
 */
export const PugnaciousStrike: Skill = {
    uid: 'pugnaciousStrike',
    name: 'Pugnacious Strike',
    hint: 'Attacks breaks enemy armor',
    level: 10,
    requiredNature: [DragonNature.Wind],
}

/**
 * Reflects some of the damage back to the attacker
 */
export const RoughSkin: Skill = {
    uid: 'roughSkin',
    name: 'Rough Skin',
    hint: 'Reflect some of the damage back to the attacker',
    level: 10,
    requiredNature: [DragonNature.Earth],
}
