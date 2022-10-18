import { Test } from "@nestjs/testing";
import { IHON_BERRY } from "src/api/items/item/data/food";
import { DataService } from "./data.service";
import { ErrorService } from "./error.service";

describe('DataService', () => {
    let dataService: DataService;
    let errorService: ErrorService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                DataService,
                ErrorService,
            ],
        }).compile();

        errorService = moduleRef.get<ErrorService>(ErrorService);
        dataService = moduleRef.get<DataService>(DataService);
    });
    
    it('should create the service', () => {
        expect(dataService).toBeTruthy();
    });

    it('should successfully get a known item', () => {
        const knownItem = IHON_BERRY;

        const foundItem = dataService.getItemData(knownItem.uid);

        expect(foundItem).toBeDefined();
        expect(foundItem.name).toBe(knownItem.name);
    });

    it('should fail to find an unknown item', () => {
        const targetUid = 'definitely-not-a-correct-uid';

        const throwErrorSpy = jest.spyOn(errorService, 'throw');

        expect(() => dataService.getItemData(targetUid)).toThrow('errors.itemNotFound');
        expect(throwErrorSpy).toBeCalledWith('errors.itemNotFound');
    });
});
 