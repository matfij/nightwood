import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/api/users/user/model/dto/user.dto";
import { DateService } from "src/common/services/date.service";
import { ErrorService } from "src/common/services/error.service";
import { Repository } from "typeorm";
import { ItemDto } from "../../item/model/dto/item.dto";
import { ItemService } from "../../item/service/item.service";
import { MIXTURE_RECIPES } from "../data/mixture-recipe";
import { MixtureRecipeDto } from "../model/dto/mixture-recipe.dto";
import { MixtureComposeDto } from "../model/dto/mixture-compose.dto";
import { MixtureGetDto, MixturePageDto } from "../model/dto/mixture-page.dto";
import { MixtureDto } from "../model/dto/mixture.dto";
import { Mixture } from "../model/mixture.entity";
import { BoosterRecipeDto } from "../model/dto/booster-recipe.dto";
import { BOOSTER_RECIPES } from "../data/booster-recipe";
import { BOOSTERS } from "../data/boosters";

@Injectable()
export class AlchemyService {

    constructor(
        @InjectRepository(Mixture)
        private mixtureRepository: Repository<Mixture>,
        private itemService: ItemService,
        private dateService: DateService,
        private errorService: ErrorService,
    ) {}

    async getMixtureRecipes(): Promise<MixtureRecipeDto[]> {
        return MIXTURE_RECIPES;
    }

    async composeMixture(user: UserDto, dto: MixtureComposeDto): Promise<MixtureDto> {
        const recipe = MIXTURE_RECIPES.find(x => x.uid === dto.recipeUid);
        if (!recipe) this.errorService.throw('errors.recipeNotFound');

        this.itemService.checkAndConsumeItems(recipe.ingredients, user.id);

        const newMixture: MixtureDto = {
            uid: recipe.uid,
            startedOn: this.dateService.getCurrentDate(),
            readyOn: this.dateService.getCurrentDate() + recipe.prepareTime,
            collected: false,
        };
        const mixture = this.mixtureRepository.create({ ...newMixture, user });
        await this.mixtureRepository.save(mixture);

        return mixture;
    }

    async getOnGoingMixtures(user: UserDto, dto: MixtureGetDto): Promise<MixturePageDto> {
        const mixtures = await this.mixtureRepository.find({
            where: { user: user, collected: false },
            skip: dto.page * dto.limit,
            take: dto.limit,
        });

        const page: MixturePageDto = {
            meta: {},
            data: mixtures.map(mixture => {
                return { ...mixture, productName: MIXTURE_RECIPES.find(x => x.uid === mixture.uid).product.name };
            }),
        };

        return page;
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

    async getBoosterRecipes(): Promise<BoosterRecipeDto[]> {
        return BOOSTER_RECIPES;
    }

    async composeBooster(user: UserDto, boosterRecipe: BoosterRecipeDto): Promise<ItemDto> {
        await this.itemService.checkAndConsumeItems(boosterRecipe.ingredients, user.id);

        return boosterRecipe.product;
    }

}
