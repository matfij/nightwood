import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class MixtureComposeDto {

    @IsString()
    @ApiProperty()
    recipeUid: string;
}
