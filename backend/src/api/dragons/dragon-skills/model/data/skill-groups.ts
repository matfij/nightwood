import { Skill } from "../definitions/dragon-skills";
import { FireBreath, GreatVigor, InnateSpeed, InnerFlow, LuckyStrike, PugnaciousStrike, RoughSkin, SoundBody, ThoughtfulStrike } from "./skills";

export const COMMON_SKILLS: Skill[] = [
    InnateSpeed,
    InnerFlow,
    LuckyStrike,
    GreatVigor,
    ThoughtfulStrike,
];

export const FIRE_SKILLS: Skill[] = [
    FireBreath,
];

export const WATER_SKILLS: Skill[] = [
    SoundBody,
];

export const WIND_SKILLS: Skill[] = [
    PugnaciousStrike,
];

export const EARTH_SKILLS: Skill[] = [
    RoughSkin,
];

export const ALL_SKILLS: Skill[] = [
    ...COMMON_SKILLS,
    ...FIRE_SKILLS,
    ...WATER_SKILLS,
    ...WIND_SKILLS,
    ...EARTH_SKILLS,
];
