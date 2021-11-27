import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class PageMetaDto {

    @ApiPropertyOptional()
    totalItems?: number;

    @ApiPropertyOptional()
    itemCount?: number;

    @ApiPropertyOptional()
    itemsPerPage?: number;

    @ApiPropertyOptional()
    totalPages?: number;

    @ApiPropertyOptional()
    currentPage?: number;
}

export class PageDto<T> {

    @IsArray()
    @ApiProperty()
    readonly data: T[];

    @ApiProperty({ type: () => PageMetaDto })
    readonly meta: PageMetaDto;
}

export abstract class PaginationBaseDto {
    @ApiProperty({ type: () => PageMetaDto })
    readonly meta: PageMetaDto;
}
