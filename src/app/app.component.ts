import { Component } from '@angular/core';
import { MessagesComponent } from './messages/messages.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    template: `
      <h1>{{title}}</h1>
      <nav>
        <a [routerLink]="['/dashboard']">Dashboard</a>
        <a [routerLink]="['/heroes']">Heroes</a>
      </nav>
      <app-messages></app-messages>
      <router-outlet></router-outlet>
    `,
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [
        RouterLink,
        RouterOutlet,
        MessagesComponent,
    ],
})
export class AppComponent {
  title = 'Tour of Heroes';
}
