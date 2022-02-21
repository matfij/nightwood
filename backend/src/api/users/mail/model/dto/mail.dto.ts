import { ApiProperty } from "@nestjs/swagger";

export class MailDto {

    @ApiProperty()
    id?: number;

    @ApiProperty()
    sentDate: number;

    @ApiProperty()
    senderId: number;

    @ApiProperty()
    senderName: string;

    @ApiProperty()
    receiverId: number;

    @ApiProperty()
    topic: string;

    @ApiProperty()
    message: string;

    @ApiProperty()
    isRead?: boolean;
}
