import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroService } from '../hero.service';
import { Hero } from './../hero';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css'],
    imports: [RouterLink]
})
export class HeroesComponent implements OnInit {
  private heroService = inject(HeroService);

  heroes = signal<Hero[]>([]);

  ngOnInit(): void {
    this.getHeroes();
  }

  async getHeroes(): Promise<void> {
    this.heroes.set(await this.heroService.getHeroes());
  }

  async add(name: string): Promise<void> {
    name = name.trim();
    if (!name) {
      return;
    }
    const hero = await this.heroService.addHero({ name } as Hero);
    this.heroes.update(heroes => [...heroes, hero]);
  }

  async delete(hero: Hero): Promise<void> {
    await this.heroService.deleteHero(hero.id);
    this.heroes.update(heroes => heroes.filter(h => h !== hero));
  }
}
