import { Component, inject } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
    selector: 'app-messages',
    template: `
    @if (messageService.messages.length) {
      <div>
        <h2>Messages</h2>
        <button type="button" class="clear" (click)="messageService.clear()">Clear messages</button>
        @for (message of messageService.messages; track $index) {
          <div>{{ message }}</div>
        }
      </div>
    }
  `,
    styleUrls: ['./messages.component.css'],
    imports: []
})
export class MessagesComponent {
  public messageService = inject(MessageService);
}
