import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { debuglog } from 'util';
import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent implements OnInit {

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
    //debuglog("importing heroes...");
    console.log("importing heroes...");
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
        console.log(heroes);
      });
  }

  async CopyHero() {
    const toast = await this.toastController.create({
      message: "Héro copié dans le presse-papier",
      position: 'bottom',
      duration: 30000,
      cssClass : "text-center"
    });
    toast.present();
  }

  /*
  Déclaration obligatoire d'un service dans un constructeur 
  (car raison: Dependency Injection)
  */
  constructor(public heroService: HeroService, public toastController: ToastController) { }

  ngOnInit(): void {
    this.importHeroes();
  }
}
