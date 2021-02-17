import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Hero } from '../models/hero';
import { HeroService } from './hero.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LocaldbService {

  constructor(
    private heroService: HeroService,
    public toastController: ToastController,
    public storage: Storage
  ) {
    //this.setObject().then(x => this.getObject().then(z => console.log(z)));
    //var db2 = new Storage({storeName:'DAZDZA',driverOrder :  ['sqlite', 'indexeddb', 'websql', 'localstorage']},[]);
    //db2.set('argent','++');
    this.InitializeDb();
  }

  init_heroes : Hero[] | undefined = [
    { id: 1, name: 'Windstorm', xp: 2, description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.' },
    { id: 2, name: 'Bombasto', xp: 644, description: 'Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.' },
    { id: 3, name: 'Magneta', xp: 1, description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
    { id: 4, name: 'Tornado', xp: 536, description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.' },
    { id: 5, name: 'Stroumpf', xp: 536, description: 'Incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem.' },
    { id: 6, name: 'Ironman', xp: 21, description: 'Ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate.' },
    { id: 7, name: 'ToterliniBoy', xp: 123, description: 'Velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.' }
  ];

  async InitializeDb(force: boolean = false) {
    var hs = await (this.Heroes());
    if (force || !hs) {
      this._heroes = this.init_heroes;
      this.UpdateDb();
      console.log('[LOG.DB] Database initialized with new Heroes list.');
    }
    console.log('[LOG.DB] Database initialized ...');
  }

  async UpdateDb() {
    return this.storage.set('heroes',this._heroes);
  }

  private _heroes: Hero[] | undefined;
  async Heroes(): Promise<Hero[] | undefined> {
    return (this._heroes ? this._heroes : this.storage.get('heroes'));
  }

}
