import { Injectable } from "@nestjs/common";

@Injectable()
export class MathService {

    randRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    limit(min: number, target: number, max: number = target): number {
        return Math.max(min, Math.min(max, target));
    }
}
