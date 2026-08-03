import { Location, UpperCasePipe } from '@angular/common';
import { Component, inject, resource } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-hero-detail',
    template: `
    @if (hero.hasValue()) {
      <div>
        <h2>{{ hero.value().name | uppercase }} Details</h2>
        <div>
          <label for="name">Hero name: </label>
          <input id="name" [(ngModel)]="hero.value().name" placeholder="name" />
        </div>
        <button type="button" (click)="goBack()">go back</button>
        <button type="button" (click)="save()">save</button>
      </div>
    }
  `,
    styleUrls: ['./hero-detail.component.css'],
    imports: [
        FormsModule,
        UpperCasePipe,
    ]
})
export class HeroDetailComponent {
  private route = inject(ActivatedRoute);
  private heroService = inject(HeroService);
  private location = inject(Location);

  hero = resource({
    params: () => Number(this.route.snapshot.paramMap.get('id')),
    loader: ({params}) => this.heroService.getHero(params),
  });

  goBack(): void {
    this.location.back();
  }

  async save(): Promise<void> {
    if (this.hero.hasValue()) {
      await this.heroService.updateHero(this.hero.value());
      this.goBack();
    }
  }
}
