import { Injectable } from "@nestjs/common";

@Injectable()
export class DateService {

    checkIfEventAvailable(nextEvent: number): boolean {
        const todayMillis = Date.now();

        return todayMillis > nextEvent;
    }
}
