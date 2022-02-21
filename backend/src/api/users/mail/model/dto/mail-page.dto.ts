import { ApiProperty } from "@nestjs/swagger";
import { PaginationBaseDto } from "src/common/definitions/pagination";
import { MailDto } from "./mail.dto";

export class MailPageDto extends PaginationBaseDto {

    @ApiProperty({ type: [MailDto] })
    data: Partial<MailDto>[];
}
