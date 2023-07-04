import { ApiProperty } from "@nestjs/swagger";

export class FriendshipPendingRequestDto {

    @ApiProperty()
    requesterId: number;

    @ApiProperty()
    requesterNick: string;
}
