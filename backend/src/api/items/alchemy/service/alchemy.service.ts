import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { DateService } from "src/common/services/date.service";
import { ErrorService } from "src/common/services/error.service";
import { Repository } from "typeorm";
import { ItemDto } from "../../item/model/dto/item.dto";
import { ItemService } from "../../item/service/item.service";
import { Booster } from "../model/booster.entity";
import { MIXTURE_RECIPES } from "../model/data/mixture-recipe";
import { MixtureComposeDto } from "../model/dto/mixture-compose.dto";
import { MixtureDto } from "../model/dto/mixture.dto";
import { Mixture } from "../model/mixture.entity";

@Injectable()
export class AlchemyService {

    constructor(
        @InjectRepository(Booster)
        private boosterRepository: Repository<Booster>,
        @InjectRepository(Mixture)
        private mixtureRepository: Repository<Mixture>,
        private itemService: ItemService,
        private dateService: DateService,
        private errorService: ErrorService,
    ) {}

    async composeMixture(user: UserDto, dto: MixtureComposeDto): Promise<MixtureDto> {
        const recipe = MIXTURE_RECIPES.find(x => x.uid === dto.recipeUid);
        if (!recipe) this.errorService.throw('errors.recipeNotFound');

        this.itemService.checkAndConsumeItems(recipe.ingredients, user.id);

        const newMixture: MixtureDto = {
            uid: recipe.uid,
            readyOn: this.dateService.getCurrentDate() + recipe.prepareTime,
            collected: false,
        };
        const mixture = this.mixtureRepository.create({ ...newMixture, user });
        await this.mixtureRepository.save(mixture);

        return mixture;
    }

    async collectMixture(user: UserDto, mixtureId: number): Promise<ItemDto> {
        const mixture = await this.mixtureRepository.findOne({
            where: { id: mixtureId, user: user },
        });
        if (!mixture) this.errorService.throw('errors.mixtureNotFound');
        if (!this.dateService.checkIfEventAvailable(mixture.readyOn)) this.errorService.throw('errors.mixtureNotReady');

        const recipe = MIXTURE_RECIPES.find(x => x.uid === mixture.uid);

        await this.itemService.updateInventory(user, [recipe.product]);

        await this.mixtureRepository.delete(mixture);

        return recipe.product;
    }

}
