import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FriendshipPendingRequestDto, FriendshipRespondDto, UserController } from 'src/app/client/api';
import { UserControllerHelper } from 'src/app/client/api-helper';
import { AbstractModalComponent } from 'src/app/common/components/abstract-modal/abstract-modal.component';
import { DisplayFriendshipPendingRequestDto } from '../../definitions/user';

@Component({
  selector: 'app-user-friend-requests',
  templateUrl: './user-friend-requests.component.html',
  styleUrls: [
    '../../../common/components/abstract-modal/abstract-modal.component.scss',
    './user-friend-requests.component.scss'
  ],
})
export class UserFriendRequestsComponent extends AbstractModalComponent implements OnInit {

  _friendInvitations: DisplayFriendshipPendingRequestDto[] = [];
  @Input() set friendInvitations(invitations: FriendshipPendingRequestDto[]) {
    this._friendInvitations = invitations.map((invitation) => ({
      ...invitation,
      avatar$: this.userControllerHelper.getAvatarPublic(invitation.requesterId)
    }))
  };
  @Output() friendshipAccepted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private userController: UserController,
    private userControllerHelper: UserControllerHelper,
  ) {
    super();
  }

  ngOnInit(): void {}

  respondToFriendshipRequest(requesterId: number, accept: boolean) {
    const params: FriendshipRespondDto = {
      requesterId: requesterId,
      accept: accept,
    };
    this.userController.respondToFriendshipRequest(params).subscribe(() => {
      this.friendshipAccepted.emit(accept);
    });
  }

}
