import { DragonNature } from "src/api/dragons/dragon/model/definitions/dragon-nature"
import { Skill } from "../definitions/dragon-skills"

/**
 * Fire
 */
export const FireBreath: Skill = {
    uid: 'fireBreath',
    name: 'Fire Breath',
    hint: 'Empowers base attack with fire component',
    level: 10,
    requiredNature: [DragonNature.Fire],
};

export const FireBolt: Skill = {
    uid: 'fireBolt',
    name: 'Fire Bolt',
    hint: 'Enables the dragon to cast fire bolts that increase caster\'s critical power (require mana)',
    level: 30,
    requiredNature: [DragonNature.Fire],
    castMana: 25,
    castChance: 0.25,
};

/**
 * Water
 */
export const SoundBody: Skill = {
    uid: 'soundBody',
    name: 'Sound Body',
    hint: 'Grants consecutive health regeneration',
    level: 10,
    requiredNature: [DragonNature.Water],
};

export const IceBolt: Skill = {
    uid: 'iceBolt',
    name: 'Ice Bolt',
    hint: 'Enables the dragon to cast ice bolts that slow down enemies (require mana)',
    level: 30,
    requiredNature: [DragonNature.Water],
    castMana: 25,
    castChance: 0.25,
};

/**
 * Wind
 */
export const PugnaciousStrike: Skill = {
    uid: 'pugnaciousStrike',
    name: 'Pugnacious Strike',
    hint: 'Attacks breaks enemy armor',
    level: 10,
    requiredNature: [DragonNature.Wind],
};

export const AirVector: Skill = {
    uid: 'airVector',
    name: 'Air Vector',
    hint: 'Enables the dragon to cast air vectors that accelerate the caster (require mana)',
    level: 30,
    requiredNature: [DragonNature.Wind],
    castMana: 25,
    castChance: 0.25,
};

/**
 * Earth
 */
export const RoughSkin: Skill = {
    uid: 'roughSkin',
    name: 'Rough Skin',
    hint: 'Reflect some of the damage back to the attacker',
    level: 10,
    requiredNature: [DragonNature.Earth],
};

export const RockBlast: Skill = {
    uid: 'rockBlast',
    name: 'Rock Blast',
    hint: 'Enables the dragon to cast rock blasts that can stun enemies (require mana)',
    level: 30,
    requiredNature: [DragonNature.Earth],
    castMana: 25,
    castChance: 0.25,
};
