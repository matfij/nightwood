import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { MixtureRecipeDto } from "../definitions/mixture-recipe.dto";

export class MixtureDto {

    @ApiPropertyOptional()
    id?: number;

    @Transform(({obj}) => { obj.user.id })
    @ApiPropertyOptional()
    userId?: number;

    @ApiProperty()
    uid: string;

    @ApiProperty()
    readyOn: number;

    @ApiProperty()
    collected: boolean;

    @ApiProperty()
    recipeData?: MixtureRecipeDto;

}
