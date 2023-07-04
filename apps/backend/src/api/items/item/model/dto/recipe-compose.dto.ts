import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RecipeComposeDto {

    @IsString()
    @ApiProperty()
    recipeUid: string;
}
