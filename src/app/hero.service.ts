import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'http://localhost:3000/heroes';
  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  async getHeroes(): Promise<Hero[]> {
    try {
      const heroes = await firstValueFrom(this.http.get<Hero[]>(this.heroesUrl));
      this.log('fetched heroes');
      return heroes;
    } catch (error: any) {
      return this.handleError<Hero[]>('getHeroes', error, []);
    }
  }

  /** GET hero by id. Will 404 if id not found */
  async getHero(id: number): Promise<Hero> {
    try {
      const url = `${this.heroesUrl}/${id}`;
      const hero = await firstValueFrom(this.http.get<Hero>(url));
      this.log(`fetched hero id=${id}`);
      return hero;
    } catch (error: any) {
      return this.handleError<Hero>(`getHero id=${id}`, error);
    }
  }

  /* GET heroes whose name contains search term */
  async searchHeroes(term: string): Promise<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return [];
    }
    try {
      const heroes = await firstValueFrom(this.http.get<Hero[]>(`${this.heroesUrl}/?name_like=${term}`));
      heroes.length
        ? this.log(`found heroes matching "${term}"`)
        : this.log(`no heroes matching "${term}"`)
      ;
      return heroes;
    } catch (error: any) {
      return this.handleError<Hero[]>('searchHeroes', error, []);
    }
  }

  /** PUT: update the hero on the server */
  async updateHero(hero: Hero): Promise<any> {
    try {
      const url = `${this.heroesUrl}/${hero.id}`;
      const response = await firstValueFrom(this.http.put(url, hero, this.httpOptions));
      this.log(`updated hero id=${hero.id}`);
      return response;
    } catch (error: any) {
      return this.handleError<any>('updateHero', error);
    }
  }

  /** POST: add a new hero to the server */
  async addHero(hero: Hero): Promise<Hero> {
    try {
      const newHero = await firstValueFrom(this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions));
      this.log(`added hero w/ id=${newHero.id}`);
      return newHero;
    } catch (error: any) {
      return this.handleError<Hero>('addHero', error);
    }
  }

  /** DELETE: delete the hero from the server */
  async deleteHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    try {
      const hero = await firstValueFrom(this.http.delete<Hero>(url, this.httpOptions));
      this.log(`deleted hero id=${id}`);
      return hero;
    } catch (error: any) {
      return this.handleError<Hero>('deleteHero', error);
    }
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param error - the error object
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', error: any, result?: T): T {
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return result as T;
  }
}
