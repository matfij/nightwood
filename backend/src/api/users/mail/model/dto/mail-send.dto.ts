import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class MailSendDto {

    @ApiProperty()
    senderId: number;

    @ApiProperty()
    @IsString()
    @MaxLength(50)
    receiverName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(500)
    topic: string;

    @ApiProperty()
    @IsString()
    @MaxLength(5000)
    message: string;
}

export interface MailSendSystemParams {
    receiverId: number;
    topic: string;
    message: string;
}
