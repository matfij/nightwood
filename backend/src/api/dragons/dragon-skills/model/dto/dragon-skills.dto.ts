import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class DragonSkillsDto {

    @Expose()
    @ApiProperty()
    id?: number;
}
