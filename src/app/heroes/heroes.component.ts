import { Component, inject, resource } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroService } from '../hero.service';
import { Hero } from './../hero';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css'],
    imports: [RouterLink]
})
export class HeroesComponent {
  private heroService = inject(HeroService);

  heroes = resource({
    loader: () => this.heroService.getHeroes(),
  });

  async add(name: string): Promise<void> {
    name = name.trim();
    if (!name) {
      return;
    }
    const hero = await this.heroService.addHero({ name } as Hero);
    this.heroes.reload();
  }

  async delete(hero: Hero): Promise<void> {
    await this.heroService.deleteHero(hero.id);
    this.heroes.reload();
  }
}
