import { ApiProperty } from "@nestjs/swagger";

export class SkillLearnDto {

    @ApiProperty()
    dragonId: number;

    @ApiProperty()
    skillUid: string;
}
