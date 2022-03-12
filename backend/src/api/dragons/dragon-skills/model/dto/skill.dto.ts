import { ApiProperty } from "@nestjs/swagger";
import { DragonNature } from "src/api/dragons/dragon/model/definitions/dragon-nature";

export class SkillDto {

    @ApiProperty()
    uid: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    hint: string;

    @ApiProperty()
    level: number;

    @ApiProperty({ isArray: true, enum: DragonNature, enumName: 'DragonNature' })
    requiredNature: DragonNature[];
}
