import { ApiProperty } from "@nestjs/swagger";
import { ItemDto } from "src/api/items/item/model/dto/item.dto";

export class DragonTamerActionDto {

    @ApiProperty()
    uid: string;

    @ApiProperty()
    hint: string;

    @ApiProperty()
    costFactor: number;

    @ApiProperty()
    baseCost: number;

    @ApiProperty()
    requiredLevel: number;

    @ApiProperty()
    withoutDragon?: boolean;

    @ApiProperty({ type: [ItemDto] })
    requiredItems: ItemDto[];

    @ApiProperty()
    requiredExperience?: number;
}
