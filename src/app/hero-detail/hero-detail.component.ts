import { Location, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  template: `
    @if (hero) {
      <div>
        <h2>{{ hero.name | uppercase }} Details</h2>
        <div>
          <label for="name">Hero name: </label>
          <input id="name" [(ngModel)]="hero.name" placeholder="name" />
        </div>
        <button type="button" (click)="goBack()">go back</button>
        <button type="button" (click)="save()">save</button>
      </div>
    }
  `,
  styleUrls: ['./hero-detail.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    UpperCasePipe,
  ],
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  async getHero(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.hero = await this.heroService.getHero(id);
  }

  goBack(): void {
    this.location.back();
  }

  async save(): Promise<void> {
    if (this.hero) {
      await this.heroService.updateHero(this.hero);
      this.goBack();
    }
  }
}
