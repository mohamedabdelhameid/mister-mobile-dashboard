import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLink } from '../../environments/api-link.environment';
import { Iglobal } from '../../../shared/interfaces/global/iglobal.interfaces';
import { IMessageResponse } from '../../interfaces/messagesInterfaces/imessage-response.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MessagesServices {
  private readonly httpClint = inject(HttpClient);
  messagesCount: WritableSignal<number> = signal(0);

  getAllMessages(): Observable<Iglobal<IMessageResponse[]>> {
    return this.httpClint.get<Iglobal<IMessageResponse[]>>(ApiLink.apiLink + 'contact-us');
  }

  replyMessage(id: string, data: object): Observable<Iglobal<IMessageResponse>> {
    return this.httpClint.post<Iglobal<IMessageResponse>>(
      ApiLink.apiLink + 'contact-us/' + id + '/reply',
      data,
    );
  }

  deleteMessage(id: string): Observable<Iglobal<IMessageResponse>> {
    return this.httpClint.delete<Iglobal<IMessageResponse>>(ApiLink.apiLink + 'contact-us/' + id);
  }
}
