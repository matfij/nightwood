import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class MixtureDto {

    @ApiPropertyOptional()
    id?: number;

    @Transform(({obj}) => { obj.user.id })
    @ApiPropertyOptional()
    userId?: number;

    @ApiProperty()
    uid: string;

    @ApiProperty()
    startedOn: number;

    @ApiProperty()
    readyOn: number;

    @ApiProperty()
    collected: boolean;

    @ApiProperty()
    productName?: string;

}
