import { HeroDetailComponent } from './../hero-detail/hero-detail.component';
import { Component, OnInit, Self } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // INITIALIZATION
  heroes !: Hero[];
  selectedHero!: Hero;
  hero: Hero = {
    id: 1,
    name: 'Windstorm',
    xp: -1
  };

  /*
  Permet la selection grâce à un event listener (click)
  */
  onSelect(hero: Hero): void {
    this.heroService.add(`HeroService: Selected hero id=${hero.id}`);
    this.selectedHero = hero;
  }

  /*
  Observable.subscribe() is the critical difference.
  The previous version assigns an array of heroes to the component's 
  heroes property. The assignment occurs synchronously, as if the server 
  could return heroes instantly or the browser could freeze the UI while
  it waited for the server's response.
  That won't work when the HeroService is actually making requests of a
  remote server.
  The new version waits for the Observable to emit the array of heroes—which
  could happen now or several minutes from now. The subscribe() method 
  passes the emitted array to the callback, which sets the component's 
  heroes property.
  This asynchronous approach will work when the HeroService requests heroes
  from the server.
  */
  importHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  // ADD HERO
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  /*
  Déclaration obligatoire d'un service dans un constructeur 
  (car raison: Dependency Injection)
  */
  constructor(public heroService: HeroService) { }

  ngOnInit(): void {
    this.importHeroes();
  }

}
