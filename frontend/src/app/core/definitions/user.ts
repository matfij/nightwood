import { Observable } from "rxjs";
import { FriendshipPendingRequestDto, UserPublicDto } from "src/app/client/api";

export interface DisplayFriendshipPendingRequestDto extends FriendshipPendingRequestDto {
  avatar$: Observable<string>;
}

export interface DisplayUserPublic extends UserPublicDto {
  avatar$: Observable<string>;
}
