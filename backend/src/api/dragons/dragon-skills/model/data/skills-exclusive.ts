import { DragonNature } from "src/api/dragons/dragon/model/definitions/dragon-nature"
import { Skill } from "../definitions/dragon-skills"

/**
 * Fire
 */

export const FireBreath: Skill = {
    uid: 'fireBreath',
    name: 'Fire Breath',
    hint: 'Empowers base attack with fire component.',
    level: 10,
    requiredNature: [DragonNature.Fire],
};

export const FireBolt: Skill = {
    uid: 'fireBolt',
    name: 'Fire Bolt',
    hint: 'Enables a dragon to cast fire bolts that increase caster\'s critical power. Base mana cost: 20, grows with skill level.',
    level: 30,
    requiredNature: [DragonNature.Fire],
    castMana: 20,
    castChance: 0.25,
};

export const InferialBlessing: Skill = {
    uid: 'inferialBlessing',
    name: 'Inferial Blessing',
    hint: 'Enhances a dragon armor and resistance.',
    level: 60,
    requiredNature: [DragonNature.Fire],
}

/**
 * Water
 */

export const SoundBody: Skill = {
    uid: 'soundBody',
    name: 'Sound Body',
    hint: 'Grants a consecutive health regeneration.',
    level: 10,
    requiredNature: [DragonNature.Water],
};

export const IceBolt: Skill = {
    uid: 'iceBolt',
    name: 'Ice Bolt',
    hint: 'Enables a dragon to cast ice bolts that slow down enemies. Base mana cost: 20, grows with skill level.',
    level: 30,
    requiredNature: [DragonNature.Water],
    castMana: 20,
    castChance: 0.25,
};

export const Freeze: Skill = {
    uid: 'freeze',
    name: 'Freeze',
    hint: 'Gives a chance to freeze the opponent, preventing him from making a move in the next turn.',
    level: 60,
    requiredNature: [DragonNature.Water],
};

/**
 * Wind
 */

export const PugnaciousStrike: Skill = {
    uid: 'pugnaciousStrike',
    name: 'Pugnacious Strike',
    hint: 'Attacks breaks enemy armor.',
    level: 10,
    requiredNature: [DragonNature.Wind],
};

export const AirVector: Skill = {
    uid: 'airVector',
    name: 'Air Vector',
    hint: 'Enables a dragon to cast air vectors that accelerate the caster. Base mana cost: 20, grows with skill level.',
    level: 30,
    requiredNature: [DragonNature.Wind],
    castMana: 20,
    castChance: 0.25,
};

export const Zeal: Skill = {
    uid: 'zeal',
    name: 'Zeal',
    hint: 'Critical strikes accelerate a dragon.',
    level: 60,
    requiredNature: [DragonNature.Wind],
};

/**
 * Earth
 */

export const RoughSkin: Skill = {
    uid: 'roughSkin',
    name: 'Rough Skin',
    hint: 'Reflect some of the damage back to the attacker.',
    level: 10,
    requiredNature: [DragonNature.Earth],
};

export const RockBlast: Skill = {
    uid: 'rockBlast',
    name: 'Rock Blast',
    hint: 'Enables a dragon to cast rock blasts that can stun enemies. Base mana cost: 20, grows with skill level.',
    level: 30,
    requiredNature: [DragonNature.Earth],
    castMana: 20,
    castChance: 0.25,
};

export const DeepWounds: Skill = {
    uid: 'deepWounds',
    name: 'Deep Wounds',
    hint: 'Base attacks has a chance to inflict bleeding that deal damage over time.',
    level: 60,
    requiredNature: [DragonNature.Earth],
};


/**
 * Electric
 */

export const StaticStrike: Skill = {
    uid: 'staticStrike',
    name: 'Static Strike',
    hint: 'Base attacks have a chance to strike enemies with an electric component that breaks armor.',
    level: 10,
    requiredNature: [DragonNature.Electric],
};

export const Thunderbolt: Skill = {
    uid: 'thunderbolt',
    name: 'Thunderbolt',
    hint: 'Enables a dragon to cast thunder bolts that can paralyze enemies. Base mana cost: 20, grows with skill level.',
    level: 30,
    requiredNature: [DragonNature.Electric],
    castMana: 20,
    castChance: 0.25,
};

export const SuperCharge: Skill = {
    uid: 'superCharge',
    name: 'Super Charge',
    hint: 'Grants the Thunder God blessing that may randomly restore a dragon\'s health.',
    level: 60,
    requiredNature: [DragonNature.Electric],
};

/**
 * Nature
 */

export const LeafCut: Skill = {
    uid: 'leafCut',
    name: 'Leaf Cut',
    hint: 'Enhances base attacks with magical leafs. Base mana cost: 5, grows with skill level.',
    level: 10,
    requiredNature: [DragonNature.Nature],
    castMana: 5,
};

export const CriticalDrain: Skill = {
    uid: 'criticalDrain',
    name: 'Critical Drain',
    hint: 'Critical strikes drain enemy\'s health and mana.',
    level: 30,
    requiredNature: [DragonNature.Nature],
};

export const EnchantedBarrier: Skill = {
    uid: 'enchantedBarrier',
    name: 'Enchanted Barrier',
    hint: 'Grants protectiong against magic and base attack. Base mana cost: 5, grows with skill level.',
    level: 60,
    requiredNature: [DragonNature.Nature],
    castMana: 5,
};

/**
 * Dark
 */

export const Poison: Skill = {
    uid: 'poison',
    name: 'Poison',
    hint: 'Base attacks infect enemies with a poison that deals damage over time.',
    level: 10,
    requiredNature: [DragonNature.Dark],
};

export const LifeLink: Skill = {
    uid: 'lifeLink',
    name: 'Life Link',
    hint: 'Base attacks drain enemy\'s health.',
    level: 30,
    requiredNature: [DragonNature.Dark],
};

export const TerribleOmen: Skill = {
    uid: 'terribleOmen',
    name: 'Terrible Omen',
    hint: 'Base attacks has a chance to reduce the opponent accuracy.',
    level: 60,
    requiredNature: [DragonNature.Dark],
};
