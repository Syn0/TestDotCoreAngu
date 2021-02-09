import { Hero } from './../hero';
import { Component, OnInit , Input} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero | undefined;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHeroByParamId();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if(this.hero === undefined) return;
    this.heroService.updateHero(this.hero as Hero)
      .subscribe(() => this.goBack());
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero).subscribe();
  }

  getHeroByParamId(): void {
    if(this.route.snapshot.params.id === undefined) return;
    const id = + this.route.snapshot.params.id;
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
}
