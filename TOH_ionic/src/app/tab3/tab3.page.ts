import { environment } from './../../environments/environment.prod';
import { HeroCreatePage } from './../hero-create/hero-create.page';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { BehaviorSubject, of } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinct, distinctUntilChanged, distinctUntilKeyChanged, filter, map, pluck, subscribeOn, switchMap, tap } from 'rxjs/operators';
import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  lastTerm: string = "";
  private searchTerms = new Subject<string>();
  RequestingHeroesLoadingBar: HTMLElement;
  SetLoadingBarActive(value: boolean) { this.RequestingHeroesLoadingBar.style.display = value ? '' : 'none'; }

  constructor(public heroService: HeroService, public modalController: ModalController) {

  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.lastTerm = term;
    this.searchTerms.next(term);
  }
  save(hero: Hero): void {
    if (hero === undefined) return;
    this.heroService.updateHero(hero)
      .subscribe();
  }
  delete(hero: Hero): void {
    if (hero === undefined) return;
    this.heroService.deleteHero(hero)
      .subscribe();
  }
  /*
  tap(_ => {
    this.log(`deleted hero id=${id}`);
    this.Toast_DeletedHero();
    this.getHeroes().subscribe();
  }),
  */


  select(hero: Hero) {
    this.heroService.onSelect(hero);
  }

  async presentCreateModal() {
    const modal = await this.modalController.create({
      component: HeroCreatePage,
      swipeToClose: true,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  ngOnInit(): void {
    this.RequestingHeroesLoadingBar = document.getElementById("RequestingHeroesLoadingBar");

    /*this.heroService.herolist = */
    this.searchTerms.pipe(

      debounceTime(50),
      distinctUntilChanged(),
      // wait 300ms after each keystroke before considering the term
      // ignore new term if same as previous term
      //filter(searchTerm => searchTerm.length > 2),

      tap(x => {
        this.SetLoadingBarActive(true);
      }),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        if (term) return this.heroService.searchHeroes(term);
        else return this.heroService.getHeroes();
      }),
    ).subscribe((x) => {
      console.log('term=' + this.lastTerm);
      console.log(x);
      this.SetLoadingBarActive(false);
      this.heroService.heroesDisplayList = x;
    });

    /*this.heroService.herolist.subscribe((x) => {
      //this.SetLoadingBarActive(false);
    });*/
    this.searchTerms.next(this.lastTerm = '');

  }


  
}
