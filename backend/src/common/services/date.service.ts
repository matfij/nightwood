import { Injectable } from "@nestjs/common";

@Injectable()
export class DateService {

    getCurrentDate(): number {
        return Date.now();
    }

    checkIfEventAvailable(nextEvent: number): boolean {
        const currentMillis = Date.now();
        return currentMillis > nextEvent;
    }

    getFutureDate(days: number = 0, hours: number = 0, minutes: number = 0): number {
        const currentMillis = Date.now();
        const futureMillis = days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + minutes * 60 * 1000;
        return currentMillis + futureMillis;
    }

    getPastDate(days: number = 0, hours: number = 0, minutes: number = 0): number {
        const currentMillis = Date.now();
        const pastMillis = days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + minutes * 60 * 1000;
        return currentMillis - pastMillis;
    }

    isTokenValid(expDate: number, maxAge: number): boolean {
        return 1000 * (expDate + maxAge) > this.getCurrentDate();
    }

    checkDateAgeInDays(date: number): number {
        return (this.getCurrentDate() - date) / (1000 * 60 * 60 * 24);
    }
}
