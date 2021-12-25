import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { DragonAction } from "src/api/dragons/dragon-action/model/dragon-action.entity";
import { DragonNature } from "../definitions/dragon-nature";

export class DragonDto {

    @Expose()
    @ApiPropertyOptional()
    id?: number;

    @Expose()
    @ApiProperty()
    name: string;

    @Expose()
    @ApiPropertyOptional()
    ownerId?: number;

    @Expose()
    @ApiProperty()
    action: DragonAction;

    @Expose()
    @ApiProperty()
    nextFeed: number;

    @Expose()
    @ApiProperty({ enum: DragonNature, enumName: 'DragonNature' })
    nature: DragonNature;

    @Expose()
    @ApiProperty()
    level: number;

    @Expose()
    @ApiProperty()
    strength: number;

    @Expose()
    @ApiProperty()
    dexterity: number;

    @Expose()
    @ApiProperty()
    endurance: number;

    @Expose()
    @ApiProperty()
    will: number;

    @Expose()
    @ApiProperty()
    luck: number;
}
