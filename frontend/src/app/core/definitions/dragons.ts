import { DragonDto, DragonNature, DragonPublicDto, SkillDto } from "src/app/client/api";

export interface AdoptStep {
  step: AdoptStepName;
  question: string;
  answers: AdoptAnswer[];
}

export interface AdoptAnswer {
  points: NaturePoints[];
  label: string;
}

export interface NaturePoints {
  nature: DragonNature;
  value: number;
}

export enum AdoptStepName {
  Trait,
  Value,
  Location,
  Name,
  Finished,
}

export enum DragonMaturity {
  Infant = 1,
  Child = 2,
  Adult = 3,
  Sage = 4,
}

export enum DragonMaturityRequiredLevel {
  Infant = 1,
  Child = 10,
  Adult = 45,
  Sage = 100,
}

export interface DisplayDragon extends DragonDto {
  image?: string;
  currentAction?: string;
  actionTime?: number;
  isSelected?: boolean;
}

export interface DisplayDragonPublic extends DragonPublicDto {
  image?: string;
}

export interface DisplaySkill extends SkillDto {
  image: string;
}
