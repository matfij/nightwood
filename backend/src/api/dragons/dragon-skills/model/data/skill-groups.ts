import { Skill } from "../definitions/dragon-skills";
import { ArmorPenetration, BeginnersLuck, Block, GreatVigor, InnateSpeed, InnerFlow, LuckyStrike, MagicArrow, Rage, ThoughtfulStrike } from "./skills-common";
import { FireBreath, SoundBody, PugnaciousStrike, RoughSkin, FireBolt, IceBolt, AirVector, rockBlast } from "./skills-exclusive";

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

export const FIRE_SKILLS: Skill[] = [
    FireBreath,
    FireBolt,
];

export const WATER_SKILLS: Skill[] = [
    SoundBody,
    IceBolt,
];

export const WIND_SKILLS: Skill[] = [
    PugnaciousStrike,
    AirVector,
];

export const EARTH_SKILLS: Skill[] = [
    RoughSkin,
    rockBlast,
];

export const ALL_SKILLS: Skill[] = [
    ...COMMON_SKILLS,
    ...FIRE_SKILLS,
    ...WATER_SKILLS,
    ...WIND_SKILLS,
    ...EARTH_SKILLS,
];
