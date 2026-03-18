import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessagesServices } from '../../../../../core/services/messagesServices/messages.services';
import { ToastUtilService } from '../../../../../core/services/toastrServices/toastr.services';

@Component({
  selector: 'app-reply-message',
  imports: [ReactiveFormsModule],
  templateUrl: './reply-message.component.html',
  styleUrl: './reply-message.component.css',
})
export class ReplyMessageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly messagesServices = inject(MessagesServices);
  private readonly toastr = inject(ToastUtilService);
  flag: boolean = false;
  @Input() message!: string;
  @Input() id!: string;
  replyMsgForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.replyMsgForm = this.fb.group({
      reply_message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  open() {
    this.flag = true;
  }
  close() {
    this.flag = false;
  }

  sendReplyMessage() {
    this.messagesServices.replyMessage(this.id, this.replyMsgForm.value).subscribe({
      next: (res) => {
        this.toastr.success('تم ارسال الرد بنجاح', 'نجحت');
        this.replyMsgForm.reset();
        this.close();
      },
      error: (err) => {
        this.toastr.error('فشل ارسال الرد عاود المحاولة لاحقا', 'فشلت');
      },
    });
  }

  onSubmit() {
    if (this.replyMsgForm.invalid) {
      this.replyMsgForm.markAllAsTouched();
      return;
    }
    this.sendReplyMessage();
  }
}
