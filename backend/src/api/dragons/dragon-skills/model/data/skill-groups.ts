import { Skill } from "../definitions/dragon-skills";
import { ArmorPenetration, BeginnersLuck, Block, GreatVigor, InnateSpeed, InnerFlow, LuckyStrike, MagicArrow, Rage, ThoughtfulStrike } from "./skills-common";
import { FireBreath, SoundBody, PugnaciousStrike, RoughSkin, FireBolt, IceBolt, AirVector, RockBlast, Thunderbolt, StaticStrike, LeafCut, CriticalDrain, Poison, LifeLink } from "./skills-exclusive";

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
];

export const EXCLUSIVE_SKILLS: Skill[] = [
    FireBreath,
    FireBolt,

    SoundBody,
    IceBolt,

    PugnaciousStrike,
    AirVector,

    RoughSkin,
    RockBlast,

    StaticStrike,
    Thunderbolt,

    LeafCut,
    CriticalDrain,

    Poison,
    LifeLink,
];

export const ALL_SKILLS: Skill[] = [
    ...COMMON_SKILLS,
    ...EXCLUSIVE_SKILLS,
];
