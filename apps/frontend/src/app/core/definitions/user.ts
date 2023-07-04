import { FriendshipPendingRequestDto, UserPublicDto } from "src/app/client/api";

export interface DisplayFriendshipPendingRequestDto extends FriendshipPendingRequestDto {
  avatar: string;
}

export interface DisplayUserPublic extends UserPublicDto {
  avatar: string;
}
