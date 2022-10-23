import { Test } from "@nestjs/testing";
import { MathService } from "./math.service";

describe('MathService', () => {
    let mathService: MathService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [MathService]
        }).compile();

        mathService = moduleRef.get<MathService>(MathService);
    });

    it('shold create service', () => {
        expect(mathService).toBeTruthy();
    });

    it('should get a random number within the specified range', () => {
        const lowerLimit = 5;
        const upperLimit = 100;

        const randomNumber = mathService.randRange(lowerLimit, upperLimit);

        expect(randomNumber).toBeGreaterThan(lowerLimit);
        expect(randomNumber).toBeLessThan(upperLimit);
    });

    it('should limit given number to the specified range', () => {
        const lowerLimit = 5;
        const upperLimit = 100;
        const targets = [1, 55, 107];
        const expectedOutputs = [5, 55, 100];

        targets.forEach((target, ind) => {
            const output = mathService.limit(lowerLimit, target, upperLimit);
            
            expect(output).toBe(expectedOutputs[ind]);
        });
    });
});
