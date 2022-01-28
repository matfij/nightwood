import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private socket: Socket,
  ) {}

  sendMessage(message: string) {

  }

  getMessage(): Observable<string> {
   return this.socket.fromEvent('message');
  //  return this.socket.fromEvent<string>('message');
  }
}


