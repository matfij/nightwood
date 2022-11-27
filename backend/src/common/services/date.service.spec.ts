import { Test } from '@nestjs/testing';
import { DateService } from './date.service';

describe('DateService', () => {
  const MAX_ERROR_MS = 100;
  let dateService: DateService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [DateService],
    }).compile();

    dateService = moduleRef.get<DateService>(DateService);
  });

  it('should create the service', () => {
    expect(dateService).toBeTruthy();
  });

  it('should get current date', () => {
    const expectedDate = Date.now();

    const currentDate = dateService.getCurrentDate();

    expect(currentDate).toBeGreaterThan(expectedDate - MAX_ERROR_MS);
    expect(currentDate).toBeLessThan(expectedDate + MAX_ERROR_MS);
  });

  it('should mark past event as available', () => {
    const eventStamp = Date.now() - 1000;

    const isAvailable = dateService.checkIfNextEventAvailable(eventStamp);

    expect(isAvailable).toBeTruthy();
  });

  it('should mark future event as unavailable', () => {
    const eventStamp = Date.now() + 1000;

    const isAvailable = dateService.checkIfNextEventAvailable(eventStamp);

    expect(isAvailable).toBeFalsy();
  });

  it('should get future date', () => {
    const futureDays = 2;
    const futureHours = 6;
    const futureMinutes = -30;
    const expectedFutureDate =
      Date.now() +
      futureDays * 24 * 60 * 60 * 1000 +
      futureHours * 60 * 60 * 1000 +
      futureMinutes * 60 * 1000;

    const futureDate = dateService.getFutureDate(
      futureDays,
      futureHours,
      futureMinutes,
    );

    expect(futureDate).toBeGreaterThan(expectedFutureDate - MAX_ERROR_MS);
    expect(futureDate).toBeLessThan(expectedFutureDate + MAX_ERROR_MS);
  });

  it('should get past date', () => {
    const pastDays = 1;
    const pastHours = -8;
    const pastMinutes = 45;
    const expectedPastDate =
      Date.now() -
      (pastDays * 24 * 60 * 60 * 1000 +
        pastHours * 60 * 60 * 1000 +
        pastMinutes * 60 * 1000);

    const futureDate = dateService.getPastDate(
      pastDays,
      pastHours,
      pastMinutes,
    );

    expect(futureDate).toBeGreaterThan(expectedPastDate - MAX_ERROR_MS);
    expect(futureDate).toBeLessThan(expectedPastDate + MAX_ERROR_MS);
  });

  it('should mark token as valid', () => {
    const expireDate = (Date.now() + 1000) / 1000;
    const maxAge = (1000) / 1000;

    const isValid = dateService.isTokenValid(expireDate, maxAge);

    expect(isValid).toBeTruthy();
  });

  it('should mark token as invalid', () => {
    const expireDate = (Date.now() - 1000) / 1000;
    const maxAge = (1000) / 1000;

    const isValid = dateService.isTokenValid(expireDate, maxAge);

    expect(isValid).toBeFalsy();
  });

  it('should get difference between a given past date and current date in days', () => {
    const pastDaysNumber = 12;
    const pastDaysStamp = pastDaysNumber * 24 * 60 * 60 * 1000;
    const pastDate = Date.now() - pastDaysStamp;

    const expectedDifference = dateService.checkDateAgeInDays(pastDate);

    expect(expectedDifference).toBeCloseTo(pastDaysNumber);
  });
});
