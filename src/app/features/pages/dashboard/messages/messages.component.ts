import { Component, inject, signal, ViewChild, WritableSignal } from '@angular/core';
import { MessagesServices } from '../../../../core/services/messagesServices/messages.services';
import { IMessageResponse } from '../../../../core/interfaces/messagesInterfaces/imessage-response.interfaces';
import { ToastUtilService } from '../../../../core/services/toastrServices/toastr.services';
import { DatePipe } from '@angular/common';
import { ReplyMessageComponent } from './reply-message/reply-message.component';

@Component({
  selector: 'app-messages',
  imports: [DatePipe, ReplyMessageComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  private readonly messagesServices = inject(MessagesServices);
  private readonly toastr = inject(ToastUtilService);
  messages: WritableSignal<IMessageResponse[]> = signal([]);
  loading: WritableSignal<boolean> = signal(false);
  @ViewChild(ReplyMessageComponent) modal!: ReplyMessageComponent;
  message!: string;
  id!: string;

  ngOnInit() {
    this.getAllMessages();
  }

  getAllMessages() {
    this.loading.set(true);
    this.messagesServices.getAllMessages().subscribe({
      next: (res) => {
        this.messages.set(res.data);
        this.messagesServices.messagesCount.set(res.data.length);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.toastr.error('فشل جلب الرسائل', 'فشلت');
      },
    });
  }

  deleteMsg(msgId: string) {
    this.messagesServices.deleteMessage(msgId).subscribe({
      next: (res) => {
        this.getAllMessages();
        this.toastr.success('تم حذف الرسالة بنجاح', 'نجحت');
      },
      error: (err) => {
        this.toastr.error('فشل الحذف', 'فشلت');
      },
    });
  }

  openModal() {
    this.modal.open();
  }
  closeModal() {
    this.modal.close();
  }
}
