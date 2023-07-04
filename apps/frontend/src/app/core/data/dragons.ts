import { DragonNature } from "src/app/client/api";
import { AdoptStep, AdoptStepName } from "../definitions/dragons";

export const ADOPT_STEPS: AdoptStep[] = [
  {
    step: AdoptStepName.Trait,
    question: 'dragon.traitQuestion',
    answers: [
      {
        label: 'dragon.fireTrait',
        points: [
          { nature: DragonNature.Fire, value: 90 },
          { nature: DragonNature.Water, value: 30 },
          { nature: DragonNature.Wind, value: 10 },
          { nature: DragonNature.Earth, value: 40 },
        ]
      },
      {
        label: 'dragon.waterTrait',
        points: [
          { nature: DragonNature.Fire, value: 40 },
          { nature: DragonNature.Water, value: 100 },
          { nature: DragonNature.Wind, value: 30 },
          { nature: DragonNature.Earth, value: 20 },
        ]
      },
      {
        label: 'dragon.windTrait',
        points: [
          { nature: DragonNature.Fire, value: 20 },
          { nature: DragonNature.Water, value: 20 },
          { nature: DragonNature.Wind, value: 90 },
          { nature: DragonNature.Earth, value: 5 },
        ]
      },
      {
        label: 'dragon.earthTrait',
        points: [
          { nature: DragonNature.Fire, value: 15 },
          { nature: DragonNature.Water, value: 25 },
          { nature: DragonNature.Wind, value: 10 },
          { nature: DragonNature.Earth, value: 80 },
        ]
      },
    ]
  },
  {
    step: AdoptStepName.Value,
    question: 'dragon.valueQuestion',
    answers: [
      {
        label: 'dragon.fireValue',
        points: [
          { nature: DragonNature.Fire, value: 80 },
          { nature: DragonNature.Water, value: 60 },
          { nature: DragonNature.Wind, value: 50 },
          { nature: DragonNature.Earth, value: 50 },
        ]
      },
      {
        label: 'dragon.waterValue',
        points: [
          { nature: DragonNature.Fire, value: 10 },
          { nature: DragonNature.Water, value: 80 },
          { nature: DragonNature.Wind, value: 50 },
          { nature: DragonNature.Earth, value: 30 },
        ]
      },
      {
        label: 'dragon.windValue',
        points: [
          { nature: DragonNature.Fire, value: 70 },
          { nature: DragonNature.Water, value: 40 },
          { nature: DragonNature.Wind, value: 90 },
          { nature: DragonNature.Earth, value: 20 },
        ]
      },
      {
        label: 'dragon.earthValue',
        points: [
          { nature: DragonNature.Fire, value: 30 },
          { nature: DragonNature.Water, value: 50 },
          { nature: DragonNature.Wind, value: 20 },
          { nature: DragonNature.Earth, value: 70 },
        ]
      },
    ]
  },
  {
    step: AdoptStepName.Location,
    question: 'dragon.locationQuestion',
    answers: [
      {
        label: 'dragon.fireLocation',
        points: [
          { nature: DragonNature.Fire, value: 60 },
          { nature: DragonNature.Water, value: 40 },
          { nature: DragonNature.Wind, value: 50 },
          { nature: DragonNature.Earth, value: 50 },
        ]
      },
      {
        label: 'dragon.waterLocation',
        points: [
          { nature: DragonNature.Fire, value: 0 },
          { nature: DragonNature.Water, value: 90 },
          { nature: DragonNature.Wind, value: 30 },
          { nature: DragonNature.Earth, value: 40 },
        ]
      },
      {
        label: 'dragon.windLocation',
        points: [
          { nature: DragonNature.Fire, value: 30 },
          { nature: DragonNature.Water, value: 10 },
          { nature: DragonNature.Wind, value: 60 },
          { nature: DragonNature.Earth, value: 50 },
        ]
      },
      {
        label: 'dragon.earthLocation',
        points: [
          { nature: DragonNature.Fire, value: 40 },
          { nature: DragonNature.Water, value: 10 },
          { nature: DragonNature.Wind, value: 10 },
          { nature: DragonNature.Earth, value: 60 },
        ]
      },
    ]
  },
];
