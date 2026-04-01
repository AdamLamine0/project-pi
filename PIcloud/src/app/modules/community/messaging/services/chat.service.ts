import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { environment } from '../../../../../environments/environment';
import { ChatMessage } from '../../shared/models/chat-message.model';

@Injectable({ providedIn: 'root' })
export class ChatService {

  private apiUrl = `${environment.apiUrl}/messages`;
  private stompClient: Client | null = null;

  // messages reçus en temps réel
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ── WebSocket ───────────────────────────────────

  connect(onConnected: () => void) {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(environment.wsUrl),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('WebSocket connecté');
        onConnected();
      },
      onDisconnect: () => console.log('WebSocket déconnecté')
    });
    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.stompClient = null;
    }
  }

  // s'abonner aux messages d'un groupe
  subscribeToGroup(groupId: string) {
    if (!this.stompClient) return;
    this.stompClient.subscribe(
      `/topic/group/${groupId}`,
      (message: IMessage) => {
        const msg: ChatMessage = JSON.parse(message.body);
        const current = this.messagesSubject.value;
        this.messagesSubject.next([...current, msg]);
      }
    );
  }

  // s'abonner aux messages privés
  subscribeToPrivate(userId: string) {
    if (!this.stompClient) return;
    this.stompClient.subscribe(
      `/user/${userId}/queue/messages`,
      (message: IMessage) => {
        const msg: ChatMessage = JSON.parse(message.body);
        const current = this.messagesSubject.value;
        this.messagesSubject.next([...current, msg]);
      }
    );
  }

  // envoyer message groupe
  sendGroupMessage(groupId: string, message: ChatMessage) {
    if (!this.stompClient) return;
    this.stompClient.publish({
      destination: `/app/chat.group/${groupId}`,
      body: JSON.stringify(message)
    });
  }

  // envoyer message privé
  sendPrivateMessage(message: ChatMessage) {
    if (!this.stompClient) return;
    this.stompClient.publish({
      destination: '/app/chat.private',
      body: JSON.stringify(message)
    });
  }

  // notification join groupe
  joinGroup(groupId: string, userId: string) {
    if (!this.stompClient) return;
    this.stompClient.publish({
      destination: `/app/chat.join/${groupId}`,
      body: JSON.stringify({ senderId: userId, groupId, type: 'JOIN', read: false, content: '' })
    });
  }

  clearMessages() {
    this.messagesSubject.next([]);
  }

  // ── REST historique ─────────────────────────────

  getGroupHistory(groupId: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/group/${groupId}`);
  }

  getPrivateHistory(senderId: string, receiverId: string): Observable<ChatMessage[]> {
    const params = new HttpParams()
      .set('senderId', senderId)
      .set('receiverId', receiverId);
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/private`, { params });
  }

  getUnreadMessages(memberId: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/unread/${memberId}`);
  }

  markAsRead(messageId: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${messageId}/read`, {});
  }
}