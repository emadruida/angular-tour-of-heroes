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

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}
