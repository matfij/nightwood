import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class DragonSkillsDto {

    @Expose()
    @ApiProperty()
    id?: number;

    @Expose()
    @ApiProperty()
    innateSpeed?: number;

    @Expose()
    @ApiProperty()
    innerFlow?: number;

    @Expose()
    @ApiProperty()
    luckyStrike?: number;

    @Expose()
    @ApiProperty()
    greatVigor?: number;

    @Expose()
    @ApiProperty()
    thoughtfulStrike?: number;

    @Expose()
    @ApiProperty()
    fireBreath?: number;

    @Expose()
    @ApiProperty()
    soundBody?: number;

    @Expose()
    @ApiProperty()
    pugnaciousStrike?: number;

    @Expose()
    @ApiProperty()
    roughSkin?: number;
}
