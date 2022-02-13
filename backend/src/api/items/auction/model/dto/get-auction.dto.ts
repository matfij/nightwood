import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ItemRarity } from "src/api/items/item/model/definitions/item-rarity";
import { ItemType } from "src/api/items/item/model/definitions/item-type";

export class GetAuctionDto {

    @IsBoolean()
    @ApiPropertyOptional()
    ownedByUser?: boolean;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    name?: string;
    
    @IsOptional()
    @ApiPropertyOptional()
    type?: ItemType;

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
