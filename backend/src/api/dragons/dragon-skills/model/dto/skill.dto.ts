import { ApiProperty } from "@nestjs/swagger";
import { DragonNature } from "src/api/dragons/dragon/model/definitions/dragon-nature";

export class SkillDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    level: number;

    @ApiProperty({ isArray: true, enum: DragonNature, enumName: 'DragonNature' })
    nature: DragonNature[];
}
