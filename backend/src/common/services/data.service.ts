import { Injectable } from "@nestjs/common";
import { ALL_ITEMS } from "src/api/items/item/model/data/_all";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";
import { ErrorService } from "./error.service";

@Injectable()
export class DataService {

    constructor(
        private errorService: ErrorService,
    ) {}

    getItemData(uid: string): ItemDto {
        const item = ALL_ITEMS.find(item => item.uid === uid);

        if (!item) this.errorService.throw('errors.itemNotFound');

        return item;
    }

}
