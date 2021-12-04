import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { DragonNature } from "../definitions/dragon-nature";

export class DragonDto {

    @Expose()
    @ApiPropertyOptional()
    id?: number;

    @Expose()
    @ApiProperty()
    name: string;

    @Expose()
    @Transform(({obj}) => obj.user.id)
    @ApiProperty()
    ownerId: number;

    @Expose()
    @ApiProperty({ enum: DragonNature })
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
