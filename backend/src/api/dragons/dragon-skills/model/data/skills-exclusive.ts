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

/**
 * Thunder
 */
export const StaticStrike: Skill = {
    uid: 'staticStrike',
    name: 'Static Strike',
    hint: 'Base attacks have a chance to strike enemies with an electric component that breaks armor',
    level: 10,
    requiredNature: [DragonNature.Electric],
};

export const Thunderbolt: Skill = {
    uid: 'thunderbolt',
    name: 'Thunderbolt',
    hint: 'Enables the dragon to cast thunder bolts that can paralyze enemies (require mana)',
    level: 30,
    requiredNature: [DragonNature.Electric],
    castMana: 25,
    castChance: 0.25,
};

/**
 * Nature
 */
export const LeafCut: Skill = {
    uid: 'leafCut',
    name: 'Leaf Cut',
    hint: 'Enhances base attacks with magical leafs (require mana)',
    level: 10,
    requiredNature: [DragonNature.Nature],
};

export const CriticalDrain: Skill = {
    uid: 'criticalDrain',
    name: 'Critical Drain',
    hint: 'Critical strikes drain enemy\'s health and mana',
    level: 30,
    requiredNature: [DragonNature.Nature],
};

/**
 * Dark
 */
export const Poison: Skill = {
    uid: 'poison',
    name: 'Poison',
    hint: 'Base attacks infect enemies with a poison that deals damage over time',
    level: 10,
    requiredNature: [DragonNature.Dark],
};

export const LifeLink: Skill = {
    uid: 'lifeLink',
    name: 'Life Link',
    hint: 'Base attacks drain enemy\'s health',
    level: 30,
    requiredNature: [DragonNature.Dark],
};
