import { Component, OnInit, inject, resource, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-dashboard',
    template: `
    <app-hero-search></app-hero-search>

    <h2>Top Heroes</h2>
    <div class="heroes-menu">
      @for (hero of heroes.value(); track hero.id) {
        <a [routerLink]="['/detail', hero.id]">{{ hero.name }}</a>
      }
    </div>`,
    styleUrls: ['./dashboard.component.css'],
    imports: [
        HeroSearchComponent,
        RouterLink,
    ]
})
export class DashboardComponent {
  private heroService = inject(HeroService);

  heroes = resource({
    loader: () => this.heroService.getHeroes().then(heroes => heroes.slice(1, 5)),
  });
}
