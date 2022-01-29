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
    this.socket.emit('General', message)
  }

  getMessage(): Observable<string> {
   return this.socket.fromEvent('General');
  //  return this.socket.fromEvent<string>('message');
  }
}


