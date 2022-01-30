import { DragonNature } from "src/api/dragons/dragon/model/definitions/dragon-nature";
import { Skill } from "../definitions/dragon-skills";

/**
 * Increase base speed
 */
export const InnateSpeed: Skill = {
    name: 'InnateSpeed',
    level: 1,
    nature: [DragonNature.Fire, DragonNature.Water, DragonNature.Wind, DragonNature.Wind],
}

/**
 * Increase maximum mana and mana regenerations
 */
export const InnerFlow: Skill = {
    name: 'InnerFlow',
    level: 1,
    nature: [DragonNature.Fire, DragonNature.Water, DragonNature.Wind, DragonNature.Wind],
}

/**
 * Increase creitical strike chance
 */
export const LuckyStrike: Skill = {
    name: 'LuckyStrike',
    level: 1,
    nature: [DragonNature.Fire, DragonNature.Water, DragonNature.Wind, DragonNature.Wind],
}

/**
 * Increase maximum health
 */
export const GreatVigor: Skill = {
    name: 'GreatVigor',
    level: 1,
    nature: [DragonNature.Fire, DragonNature.Water, DragonNature.Wind, DragonNature.Wind],
}

/** 
 * Decreases enemy dodge chance
 */
export const ThoughtfulStrike: Skill = {
   name: 'ThoughtfulStrike',
   level: 1,
   nature: [DragonNature.Fire, DragonNature.Water, DragonNature.Wind, DragonNature.Wind],
}

/**
 * Attack has additional damage component
 */
export const FireBreath: Skill = {
    name: 'FireBreath',
    level: 10,
    nature: [DragonNature.Fire],
}

/**
 * Consecutive health regeneration
 */
export const SoundBody: Skill = {
    name: 'SoundBody',
    level: 10,
    nature: [DragonNature.Water],
}

/**
 * Attacks breaks enemy armor
 */
export const PugnaciousStrike: Skill = {
    name: 'PugnaciousStrike',
    level: 10,
    nature: [DragonNature.Wind],
}

/**
 * Reflect some of the damage back to the attacker
 */
export const RoughSkin: Skill = {
    name: 'RoughSkin',
    level: 10,
    nature: [DragonNature.Earth],
}
