import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroService } from '../hero.service';
import { Hero } from './../hero';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css'],
    standalone: true,
    imports: [RouterLink],
})
export class HeroesComponent implements OnInit {
  private heroService = inject(HeroService);

  heroes: Hero[] = [];

  ngOnInit(): void {
    this.getHeroes();
  }

  async getHeroes(): Promise<void> {
    this.heroes = await this.heroService.getHeroes();
  }

  async add(name: string): Promise<void> {
    name = name.trim();
    if (!name) {
      return;
    }
    const hero = await this.heroService.addHero({ name } as Hero);
    this.heroes.push(hero);
  }

  async delete(hero: Hero): Promise<void> {
    await this.heroService.deleteHero(hero.id);
    this.heroes = this.heroes.filter(h => h !== hero);
  }
}
