import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../hero';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-hero-search></app-hero-search>

    <h2>Top Heroes</h2>
    <div class="heroes-menu">
      @for (hero of heroes; track hero.id) {
        <a [routerLink]="['/detail', hero.id]">{{ hero.name }}</a>
      }
    </div>`,
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    HeroSearchComponent,
    RouterLink,
  ],
})
export class DashboardComponent implements OnInit {
  private heroService = inject(HeroService);

  heroes: Hero[] = [];

  ngOnInit(): void {
    this.getHeroes();
  }

  async getHeroes(): Promise<void> {
    const heroes = await this.heroService.getHeroes();
    this.heroes = heroes.slice(1, 5);
  }
}
