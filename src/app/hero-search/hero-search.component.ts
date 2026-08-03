import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-hero-search',
    template: `
    <div id="search-component">
      <label for="search-box">Hero Search</label>
      <input #searchBox id="search-box" (input)="search(searchBox.value)" />

      <ul class="search-result">
        @for (hero of heroes$ | async; track hero.id) {
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
        AsyncPipe,
    ]
})
export class HeroSearchComponent implements OnInit {
  private heroService = inject(HeroService);

  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap(async (term: string) => await this.heroService.searchHeroes(term))
    );
  }
}
