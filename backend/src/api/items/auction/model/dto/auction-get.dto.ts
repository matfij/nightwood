import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ItemRarity, ItemType } from "src/api/items/item/model/definitions/items";

export class AuctionGetDto {

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
