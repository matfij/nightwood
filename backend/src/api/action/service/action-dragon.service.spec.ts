import { Test } from "@nestjs/testing";
import { ActionDragonService } from "./action-dragon.service";
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { DragonNature } from "src/api/dragons/dragon/model/definitions/dragons";

const moduleMocker = new ModuleMocker(global);

describe('ActionDragonService', () => {
    
    let actionDragonService: ActionDragonService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [ActionDragonService]
        })
        .useMocker((token) => {
            const results = ['s1', 's2'];
            if (token === ActionDragonService) {
                return { findAll: jest.fn().mockRejectedValue(results) }
            }
            if (typeof token === 'function') {
                const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
                const Mock = moduleMocker.generateFromMetadata(mockMetadata);
                return new Mock();
            }
        })
        .compile();

        actionDragonService = moduleRef.get<ActionDragonService>(ActionDragonService);
    });

    it('should create service', () => {
        expect(actionDragonService).toBeTruthy();
    });
});
