import { AppModule } from './../app.module';
import { Monster } from './../models/monster';
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
import { AppComponent } from '../app.component';

@Injectable({ providedIn: 'root' })
export class InMemHeroService implements InMemoryDbService {

  test = 1;

  //format de la BDD
  private _localdb: appdb | undefined;
  public get localdb(): appdb | undefined {
    return this._localdb;
  }
  public set localdb(value: appdb | undefined) {
    this._localdb = value;
  }

  constructor(
    public toastController: ToastController,
    public storage: Storage,
    public appli : AppModule
  ) {
    if(appli.singletonIMS!=null) return;
    appli.singletonIMS = this;
    //this.setObject().then(x => this.getObject().then(z => console.log(z)));
    //var db2 = new Storage({storeName:'DAZDZA',driverOrder :  ['sqlite', 'indexeddb', 'websql', 'localstorage']},[]);
    //db2.set('argent','++');
    console.log("[LOG.DB] New local database instance");
    console.log(this.test);

  }

  private async ResetDb() {
    this.localdb = { heroes: this.init_heroes, monsters: this.init_monsters };
    await this.PushDatabase();
    console.log('[LOG.DB] Database reseted !');
  }

  async createDb() {
    //this.InitializeDb();

    //this.PullDatabase();

    console.log('[LOG.DB] Database fetching...');
    this.localdb = await this.storage.get('database');
    console.log('[LOG.DB] Database fetched !');
    console.log('[LOG.DB] Database is :');
    console.log(this.localdb);
    if (!this.localdb || !this.localdb.heroes || !this.localdb.monsters) {
      console.log('[LOG.DB] Database seems to be empty !');
      console.log('[LOG.DB] Database reseting ...');
      this.ResetDb();
    }
    console.log('[LOG.DB] Database initialized');

    this.test = 2;
    console.log(this.test);
    /* Load data from indexed/local db and insert to return statement ! */
    return { heroes: this.localdb.heroes, monsters: this.localdb.monsters};
  }


  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  // genId(heroes: Hero[]): number { return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 1;}


  private init_heroes: Hero[] = [
    { id: 1, name: 'Windstorm', xp: 2, description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.' },
    { id: 2, name: 'Bombasto', xp: 644, description: 'Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.' },
    { id: 3, name: 'Magneta', xp: 1, description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
    { id: 4, name: 'Tornado', xp: 536, description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.' },
    { id: 5, name: 'Stroumpf', xp: 536, description: 'Incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem.' },
    { id: 6, name: 'Ironman', xp: 21, description: 'Ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate.' },
    { id: 7, name: 'TorteliniBoy', xp: 123, description: 'Velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.' }
  ];
  private init_monsters: Monster[] = [
    { id: 1, name: 'Goblin', xp: 2, description: 'Dolorem unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.' },
    { id: 2, name: 'Stormtrooper', xp: 123, description: 'Inventore esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.' }
  ];

  async PushDatabase(): Promise<boolean> {
    await this.storage.set('database', this.localdb);
    return true;
  }
  async PullDatabase() {
    console.log('[LOG.DB] Database pulling...');
    this.localdb = await this.storage.get('database');
    console.log('[LOG.DB] Database pulled !');
    return this.localdb;
  }

}

export interface appdb {
  heroes: Hero[];
  monsters: Monster[];
}