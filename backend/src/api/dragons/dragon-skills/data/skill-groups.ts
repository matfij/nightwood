import { Skill } from "../model/definitions/dragons-skills";
import { ArmorPenetration, BeginnersLuck, Block, Dodge, GreatVigor, InnateSpeed, InnerFlow, LethalBlow, LuckyStrike, MagicArrow, Rage, ThoughtfulStrike, TreasureHunter } from "./skills-common";
import { FireBreath, SoundBody, PugnaciousStrike, RoughSkin, FireBolt, IceBolt, AirVector, RockBlast, Thunderbolt, StaticStrike, LeafCut, CriticalDrain, Poison, LifeLink, InferialBlessing, Freeze, Zeal, DeepWounds, SuperCharge, EnchantedBarrier, TerribleOmen } from "./skills-exclusive";

export const COMMON_SKILLS: Skill[] = [
    InnateSpeed,
    InnerFlow,
    LuckyStrike,
    GreatVigor,
    ThoughtfulStrike,
    BeginnersLuck,
    MagicArrow,
    Block,
    ArmorPenetration,
    Rage,
    Dodge,
    TreasureHunter,
    LethalBlow,
];

export const EXCLUSIVE_SKILLS: Skill[] = [
    FireBreath,
    FireBolt,
    InferialBlessing,

    SoundBody,
    IceBolt,
    Freeze,

    PugnaciousStrike,
    AirVector,
    Zeal,

    RoughSkin,
    RockBlast,
    DeepWounds,

    StaticStrike,
    Thunderbolt,
    SuperCharge,

    LeafCut,
    CriticalDrain,
    EnchantedBarrier,

    Poison,
    LifeLink,
    TerribleOmen,
];

export const ALL_SKILLS: Skill[] = [
    ...COMMON_SKILLS,
    ...EXCLUSIVE_SKILLS,
];
