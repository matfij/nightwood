import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

import { RepositoryService } from '../services/repository.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSocket extends Socket {

  constructor(
    repositoryService: RepositoryService,
  ) {
    const token = repositoryService.getAccessToken();
    const config: SocketIoConfig = {
      url: environment.apiUrl,
      options: {
        transportOptions: {
          polling: { extraHeaders: { Authorization: token } },
        },
      },
    };

    super(config);
  }
}
