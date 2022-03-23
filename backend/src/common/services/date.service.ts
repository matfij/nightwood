import { Injectable } from "@nestjs/common";

@Injectable()
export class DateService {

    getCurrentDate() {
        return Date.now();
    }

    checkIfEventAvailable(nextEvent: number): boolean {
        const currentMillis = Date.now();

        return currentMillis > nextEvent;
    }

    getFutureDate(days: number = 0, hours: number = 0, minutes: number = 0) {
        const currentMillis = Date.now();
        
        const futureMillis = days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + minutes * 60 * 1000;
        
        return currentMillis + futureMillis;
    }

    isTokenValid(expDate: number, maxAge: number): boolean {
        return 1000 * (expDate + maxAge) > this.getCurrentDate();
    }
}
