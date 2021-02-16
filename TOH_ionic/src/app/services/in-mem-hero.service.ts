import { HeroService } from './hero.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Hero } from '../models/hero';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class InMemHeroService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Windstorm', xp: 2, xP2: 19, description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.' },
      { id: 2, name: 'Bombasto', xp: 644, xP2: 19, description: 'Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.' },
      { id: 3, name: 'Magneta', xp: 1, xP2: 19, description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
      { id: 4, name: 'Tornado', xp: 536, xP2: 19, description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.' },
      { id: 5, name: 'Stroumpf', xp: 536, xP2: 19, description: 'Incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem.' },
      { id: 6, name: 'Ironman', xp: 21, xP2: 19, description: 'Ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate.' },
      { id: 7, name: 'ToterliniBoy', xp: 123, xP2: 19, description: 'Velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.' }
    ];
    return { heroes };
  }


  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }

  constructor(
    private heroService: HeroService,
    public toastController: ToastController,
    public storage: Storage
  ) {
    this.setObject().then(x => this.getObject().then(z => console.log(z)));
    var db2 = new Storage({storeName:'DAZDZA',driverOrder :  ['sqlite', 'indexeddb', 'websql', 'localstorage']},[]);
    db2.set('argent','++');
  }


  // JSON "set" example
  async setObject() {
    this.storage.set('name', {toto:'tata'});
  }

  // JSON "set" example
  async getObject() {
    return this.storage.get('name');
  }


}
