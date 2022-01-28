import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { AuthSocket } from '../utils/auth-socket';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private socket: AuthSocket,
  ) {}

  sendMessage(message: string) {

  }

  getMessage(): Observable<string> {
   return this.socket.fromEvent('message');
  //  return this.socket.fromEvent<string>('message');
  }
}


