import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator";
import { ItemRarity } from "src/api/items/item/model/definitions/item-rarity";
import { ItemType } from "src/api/items/item/model/definitions/item-type";

export class GetAuctionDto {

    @IsEnum(ItemType)
    @IsOptional()
    @ApiPropertyOptional()
    type?: ItemType;

    @IsEnum(ItemRarity)
    @IsOptional()
    @ApiPropertyOptional()
    requiredRarity?: ItemRarity;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    @ApiPropertyOptional()
    minLevel?: number;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    @ApiPropertyOptional()
    maxLevel?: number;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    page?: number;
    
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    limit?: number;
}
