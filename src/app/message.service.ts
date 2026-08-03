import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages = signal<string[]>([]);

  add(message: string) {
    this.messages.update((msgs) => [...msgs, message]);
  }

  clear() {
    this.messages = signal<string[]>([]);
  }
}
