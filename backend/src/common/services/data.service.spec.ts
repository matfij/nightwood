import { Test } from "@nestjs/testing";
import { DataService } from "./data.service";
import { ErrorService } from "./error.service";

describe('DataService', () => {
    let dataService: DataService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                DataService,
                ErrorService,
            ],
        }).compile();

        dataService = moduleRef.get<DataService>(DataService);
    });
    
    it('it should create the service', () => {
        expect(dataService).toBeTruthy();
    });
});
