export enum AchievementType {
    OwnedDragons = 'OwnedDragons'
}

export interface Achievement {
    uid: string;
    name: string;
    hint: string;

    requiredType?: AchievementType;
    requiredPoints?: number;
}
