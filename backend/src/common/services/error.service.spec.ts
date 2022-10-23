import { Test } from "@nestjs/testing";
import { ErrorService } from "./error.service";

describe('ErrorService', () => {
    let errorService: ErrorService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [ErrorService]
        }).compile();

        errorService = moduleRef.get<ErrorService>(ErrorService);
    });

    it('should create service', () => {
        expect(errorService).toBeTruthy();
    });

    it('should throw error', () => {
        const errorMessage = 'errors.badArguments';

        expect(() => errorService.throw(errorMessage)).toThrowError(errorMessage);
    });

    it('should pass a phrase that does not contain forbidden words', () => {
        const goodPhrase = 'Unit tests make a system more flexible.';

        const isValid = errorService.isPhareClear(goodPhrase);

        expect(isValid).toBeTruthy();
    });

    it('should block a phrase that contains forbidden words', () => {
        const badPhrase = 'What the fuck?!';

        const isValid = errorService.isPhareClear(badPhrase);

        expect(isValid).toBeFalsy();
    });
});
