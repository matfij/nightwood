import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class PageMetaDto {

    @ApiProperty()
    totalItems: number;

    @ApiProperty()
    itemCount: number;

    @ApiProperty()
    itemsPerPage: number;

    @ApiProperty()
    totalPages: number;

    @ApiProperty()
    currentPage: number;
}

export class PageDto<T> {

    @IsArray()
    @ApiProperty()
    readonly data: T[];

    @ApiProperty({ type: () => PageMetaDto })
    readonly meta: PageMetaDto;
}
