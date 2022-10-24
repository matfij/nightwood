import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { ActionModule } from "./action.module";
import { ActionDragonService } from "./service/action-dragon.service";

describe('ActionModule', () => {
    let app: INestApplication;
    let actionDragonService = {
        adoptDragon: () => { return { name: 'Drake', level: 1 }; }
    };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [ActionModule]
        })
            .overrideProvider(ActionDragonService)
            .useValue(actionDragonService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it('/POST adoptDragon', () => {
        return request(app.getHttpServer())
            .post('/adoptDragon')
            .expect(200)
            .expect({
                data: actionDragonService.adoptDragon(),
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
