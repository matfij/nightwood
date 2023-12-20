import { DragonNature } from 'src/api/dragons/dragon/model/definitions/dragons';
import { Skill } from '../model/definitions/dragons-skills';

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
    hint: "Enables a dragon to cast fire bolts that increase caster's critical power. Base mana cost: 20, grows with skill level.",
    level: 30,
    requiredNature: [DragonNature.Fire],
    castMana: 20,
    castChance: 0.25,
    damageSpread: 0.1,
    damageMod: 0.1,
    magicalAttackMod: 1.31,
    physicalAttackMod: 0,
    magicalDefMod: 1,
    physicalDefMod: 0.1,
};

export const InferialBlessing: Skill = {
    uid: 'inferialBlessing',
    name: 'Inferial Blessing',
    hint: "Enhances dragon's armor and resistance.",
    level: 60,
    requiredNature: [DragonNature.Fire],
};

export const BlazeScar: Skill = {
    uid: 'blazeScar',
    name: 'Blaze Scar',
    hint: 'Gives a chance to inflict a Blaze Scar that will deal damage over time.',
    level: 100,
    requiredNature: [DragonNature.Fire],
};

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
    damageSpread: 0.1,
    damageMod: 0.1,
    magicalAttackMod: 1.28,
    physicalAttackMod: 0,
    magicalDefMod: 1,
    physicalDefMod: 0.1,
};

export const Freeze: Skill = {
    uid: 'freeze',
    name: 'Freeze',
    hint: 'Gives a chance to freeze the opponent, preventing him from making a move in the next turn.',
    level: 60,
    requiredNature: [DragonNature.Water],
};

export const TidalSurge: Skill = {
    uid: 'tidalSurge',
    name: 'Tidal Surge',
    hint: 'Once, at the beggining of the battle, summons a powerful wave that deals damage and slows the enemy.',
    level: 100,
    requiredNature: [DragonNature.Water],
    damageSpread: 0.1,
    damageMod: 0.1,
    magicalAttackMod: 1.31,
    physicalAttackMod: 0,
    magicalDefMod: 1,
    physicalDefMod: 0.1,
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
    damageSpread: 0.1,
    damageMod: 0.1,
    magicalAttackMod: 1.28,
    physicalAttackMod: 0,
    magicalDefMod: 1,
    physicalDefMod: 0.1,
};

export const Zeal: Skill = {
    uid: 'zeal',
    name: 'Zeal',
    hint: 'Critical strikes accelerate a dragon.',
    level: 60,
    requiredNature: [DragonNature.Wind],
};

export const TempestFury: Skill = {
    uid: 'tempestFury',
    name: 'Tempest Fury',
    hint: 'Unleash a raging tempest that deals devastating damage and guarantees critical during next action. Base mana cost: 50, grows with skill level.',
    level: 100,
    requiredNature: [DragonNature.Wind],
    castMana: 50,
    castChance: 0.15,
    damageSpread: 0.25,
    damageMod: 0.1,
    magicalAttackMod: 1.81,
    physicalAttackMod: 0,
    magicalDefMod: 1,
    physicalDefMod: 0.1,
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
    damageSpread: 0.1,
    damageMod: 0.1,
    magicalAttackMod: 1.31,
    physicalAttackMod: 0,
    magicalDefMod: 1,
    physicalDefMod: 0.1,
};

export const DeepWounds: Skill = {
    uid: 'deepWounds',
    name: 'Deep Wounds',
    hint: 'Base attacks has a chance to inflict bleeding that deal damage over time.',
    level: 60,
    requiredNature: [DragonNature.Earth],
};

export const Earthquake: Skill = {
    uid: 'earthquake',
    name: 'Earthquake',
    hint: 'Once, at the beggining of the battle, summons almighty earthquake that breaks enemy armor.',
    level: 100,
    requiredNature: [DragonNature.Earth],
    damageSpread: 0.1,
    damageMod: 0.1,
    magicalAttackMod: 1.31,
    physicalAttackMod: 0,
    magicalDefMod: 1,
    physicalDefMod: 0.1,
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
    damageSpread: 0.6,
    damageMod: 0.11,
    magicalAttackMod: 1.77,
    physicalAttackMod: 0,
    magicalDefMod: 1,
    physicalDefMod: 0.1,
};

export const SuperCharge: Skill = {
    uid: 'superCharge',
    name: 'Super Charge',
    hint: "Grants the Thunder God blessing that may randomly restore a dragon's health.",
    level: 60,
    requiredNature: [DragonNature.Electric],
};

export const ElectroStrike: Skill = {
    uid: 'electroStrike',
    name: 'Electro Strike',
    hint: 'Enchances the Static Strike with ability to break magic resistance and paralyze enemies.',
    level: 100,
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
    hint: "Critical strikes drain enemy's health and mana.",
    level: 30,
    requiredNature: [DragonNature.Nature],
};

export const EnchantedBarrier: Skill = {
    uid: 'enchantedBarrier',
    name: 'Enchanted Barrier',
    hint: 'Grants protectiong against magic and physical attacks. Base mana cost: 5, grows with skill level.',
    level: 60,
    requiredNature: [DragonNature.Nature],
    castMana: 5,
};

export const SolarBeam: Skill = {
    uid: 'solarBeam',
    name: 'Solar Beam',
    hint: 'Enables a dragon to cast Solar beam that deals heavy damage and lowers the enemy accuracy. Base mana cost: 50, grows with skill level.',
    level: 100,
    requiredNature: [DragonNature.Nature],
    castMana: 50,
    castChance: 0.2,
    damageSpread: 0.2,
    damageMod: 0.1,
    magicalAttackMod: 1.84,
    physicalAttackMod: 0,
    magicalDefMod: 1,
    physicalDefMod: 0.11,
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
    hint: "Base attacks drain enemy's health.",
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

export const LaserExedra: Skill = {
    uid: 'laserExedra',
    name: 'Laser Exedra',
    hint: 'Enables a dragon to cast almighty beam that deals heavy damage and reduces the enemy maximum health. Base mana cost: 50, grows with skill level.',
    level: 100,
    requiredNature: [DragonNature.Dark],
    castMana: 50,
    castChance: 0.15,
    damageSpread: 0.15,
    damageMod: 0.11,
    magicalAttackMod: 1.84,
    physicalAttackMod: 0,
    magicalDefMod: 1,
    physicalDefMod: 0.1,
};

/**
 * Power
 */

export const VeritableStrike: Skill = {
    uid: 'veritableStrike',
    name: 'Veritable Strike',
    hint: 'Base attacks are enhanced with true damage component.',
    level: 10,
    requiredNature: [DragonNature.Power],
};

export const WoundedPride: Skill = {
    uid: 'woundedPride',
    name: 'Wounded Pride',
    hint: 'Taking damage increases dragon base stats.',
    level: 30,
    requiredNature: [DragonNature.Power],
};

export const ProminenceBlast: Skill = {
    uid: 'prominenceBlast',
    name: 'Prominence Blast',
    hint: 'Performs a powerful attack at the beginning of the combat that uses all the dragons mana. Will not instantly kill the enemy.',
    level: 60,
    requiredNature: [DragonNature.Power],
    damageSpread: 0.1,
    damageMod: 0.12,
    magicalAttackMod: 1.84,
    physicalAttackMod: 1.84,
    magicalDefMod: 1,
    physicalDefMod: 1,
};

export const AndromedaArrow: Skill = {
    uid: 'andromedaArrow',
    name: 'Andromeda Arrow',
    hint: 'Enables a dragon to cast Andromeda Arrow that deals severe damage and diminishes enemy mana. Base mana cost: 50, grows with skill level.',
    level: 100,
    requiredNature: [DragonNature.Power],
    castMana: 50,
    castChance: 0.2,
    damageSpread: 0.15,
    damageMod: 0.11,
    magicalAttackMod: 1.89,
    physicalAttackMod: 0,
    magicalDefMod: 1,
    physicalDefMod: 0.1,
};

/**
 * Mechanical
 */

export const SuperiorEngine: Skill = {
    uid: 'superiorEngine',
    name: 'Superior Engine',
    hint: 'Increases all base satistics',
    level: 10,
    requiredNature: [DragonNature.Mechanical],
};

export const SpiralCannon: Skill = {
    uid: 'spiralCannon',
    name: 'Spiral Cannon',
    hint: 'Enables a dragon to cast destructive attack that ignores target defence and inflict bleeding',
    level: 30,
    requiredNature: [DragonNature.Mechanical],
    castChance: 0.2,
    castMana: 0,
    damageSpread: 0.2,
    damageMod: 0.11,
    magicalAttackMod: 0,
    physicalAttackMod: 1.77,
    magicalDefMod: 0.1,
    physicalDefMod: 1,
};

export const EnergyShield: Skill = {
    uid: 'energyShield',
    name: 'Energy Shield',
    hint: 'Grants a barrier that will reduce incoming damage',
    level: 60,
    requiredNature: [DragonNature.Mechanical],
};

export const InvincibleTechnology: Skill = {
    uid: 'invincibleTechnology',
    name: 'Invincible Technology',
    hint: 'Base attacks diminish enemy statistics',
    level: 100,
    requiredNature: [DragonNature.Mechanical],
};

/**
 * Time
 */

export const TimeAccel: Skill = {
    uid: 'timeAccel',
    name: 'Time Accel',
    hint: 'Increases initial initiative',
    level: 10,
    requiredNature: [DragonNature.Time],
};

export const StarWind: Skill = {
    uid: 'starWind',
    name: 'Star Wind',
    hint: 'Enables dragon to cast mighty magical attack that also breaks enemy defences',
    level: 30,
    requiredNature: [DragonNature.Time],
    castMana: 30,
    castChance: 0.2,
    damageSpread: 0.1,
    damageMod: 0.11,
    magicalAttackMod: 1.77,
    physicalAttackMod: 0,
    magicalDefMod: 1,
    physicalDefMod: 0.1,
};

export const FeebleDream: Skill = {
    uid: 'feebleDream',
    name: 'Feeble Dream',
    hint: 'Opponent statistics fades every turn',
    level: 60,
    requiredNature: [DragonNature.Time],
};

export const TimeAlter: Skill = {
    uid: 'timeAlter',
    name: 'Time Alter',
    hint: 'Enables dragon to revive after receiving fatal damage',
    level: 100,
    requiredNature: [DragonNature.Time],
};
