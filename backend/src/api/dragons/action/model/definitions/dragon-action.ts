import { Entity } from "typeorm";

export enum DragonActionType {
    None,
    Expedition,
    Training,
}

@Entity()
export class DragonAction {
    type: DragonActionType;
    startTime: string | number;
    endTime: string | number;
    duration: string| number;
}
