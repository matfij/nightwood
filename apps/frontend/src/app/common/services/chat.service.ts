import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage, ChatMode } from '../definitions/chat';
import { AuthSocket } from '../utils/auth-socket';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private socket: AuthSocket,
  ) {}

  sendMessage(mode: ChatMode, message: ChatMessage) {
    this.socket.emit(mode, message)
  }

  getMessages(mode: ChatMode): Observable<ChatMessage[]> {
    this.socket.connect();
    return this.socket.fromEvent(mode);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
