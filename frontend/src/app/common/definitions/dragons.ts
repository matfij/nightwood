import { DragonNature } from "src/app/client/api";

export interface AdoptStage {
  step: AdoptStep;
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

export enum AdoptStep {
  Trait,
  Value,
  Location,
  Name,
  Finished,
}
