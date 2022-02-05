import { ApiProperty } from "@nestjs/swagger";

export class LearnskillDto {

    @ApiProperty()
    dragonId: number;

    @ApiProperty()
    skillName: string;
}
