export enum StructureType {
    Sawmill,
    Quarry,
    Forge,
    TamerTower,
    TenacityTower,
    BeaconTower,
}

export interface DisplayBuilding {
    name: string;
    type: StructureType;
    icon: string;
    level: number;
}
