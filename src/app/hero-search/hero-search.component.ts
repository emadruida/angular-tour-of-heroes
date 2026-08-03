import { Component, debounced, inject, resource, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HeroService } from '../hero.service';

@Component({
    selector: 'app-hero-search',
    template: `
    <div id="search-component">
      <label for="search-box">Hero Search</label>
      <input id="search-box" (input)="searchTerms.set($event.target.value)" />

      @if(heroes.isLoading()) {
        <p>Searching...</p>
      }
      <ul class="search-result">
        @for (hero of heroes.value(); track hero.id) {
          <li>
            <a [routerLink]="['/detail', hero.id]">{{hero.name}}</a>
          </li>
        }
      </ul>
    </div>
  `,
    styleUrls: ['./hero-search.component.css'],
    imports: [
        RouterLink,
    ]
})
export class HeroSearchComponent {
  private heroService = inject(HeroService);

  public searchTerms = signal('');

  private debouncedSearchTerms = debounced(this.searchTerms, 300);

  public heroes = resource({
    params: () => this.debouncedSearchTerms.value(),
    loader: ({params}) => this.heroService.searchHeroes(params),
  });
}
