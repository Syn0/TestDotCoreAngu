import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Hero } from './../models/hero';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { Utils } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  public herolist: Observable<Hero[]> | undefined;
  public hs: Hero[] = [];
  public copiedhero: Hero | undefined;
  
  // FETCH SERVICE EXAMPLE
  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(environment.heroesUrl)
      .pipe(
        tap(_ => this.log('Fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${environment.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`Fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${environment.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length > 0 ?
        console.log(`Found ` + x.length + ` heroes matching "${term}"`) :
        console.log(`No heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', [])),
    );
  }

  // MESSAGE SERVICE EXAMPLE
  messages: string[] = [];
  add(message: string) {
    this.messages.push(message);
  }
  clear() {
    this.messages = [];
  }

  // URL to web api
  //https://localhost:44322/api/heroes sous VS
  //https://localhost:5001/api/heroes sous Build prod
  private log(message: string) {
    console.log("[LOG] " + message);
    this.add(`HeroService: ${message}`);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${environment.heroesUrl}/${id}`;

    return this.http.put(url, hero, this.httpOptions).pipe(
      tap(_ => {
        this.log(`updated hero id=${id}`);
        this.Toast_SavedHero();
      }),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero): Observable<Hero> {
    return this.http.post<Hero>(environment.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );;
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${environment.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => {
        this.log(`deleted hero id=${id}`);
        this.Toast_DeletedHero();
        this.getHeroes().subscribe();
      }),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }



  /*
  Permet la selection grâce à un event listener (click)
  */
  selectedHero!: Hero;
  onSelect(hero: Hero): void {
    this.add(`HeroService: Selected hero id=${hero.id}`);
    this.selectedHero = hero;
    //document.getElementById("TabContent").scrollToTop();
    //this.ScrollToElementID("TabContent","HeroDetail", 1000);
  }
  onCopy(hero: Hero) {
    this.copiedhero = (hero);
    this.Toast_CopyHero();
  }
  ScrollToElementID(containerid: string, targetid: string, speed: number | undefined) {
    if (speed == null) speed = 1000;
    var offsettop = document.getElementById(targetid).offsetTop;
    console.log(offsettop);
    //document.getElementById(containerid).scrollTo({ top: offsettop, behavior: 'smooth'});
    //document.body.animate({ scrollTop: offsettop }, speed);
    //document.getElementById(containerid).animate({ scrollTop: offsettop }, speed);
  }
  public async Toast_CopyHero() {
    const toast = await this.toastController.create({
      message: "Hero copied",
      position: 'bottom',
      duration: 3000,
      cssClass: "text-center"
    });
    toast.present();
  }
  public async Toast_SavedHero() {
    const toast = await this.toastController.create({
      message: "Hero updated with success",
      position: 'bottom',
      duration: 3000,
      cssClass: "text-center"
    });
    toast.present();
  }
  public async Toast_DeletedHero() {
    const toast = await this.toastController.create({
      message: "Hero deleted with success",
      position: 'bottom',
      duration: 3000,
      cssClass: "text-center"
    });
    toast.present();
  }

  public async Toast_Error(text: string) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 15000,
      cssClass: "text-center",
      color: "danger"
    });
    toast.present();
  }
  public async Toast_Created(hero: Hero) {
    const toast = await this.toastController.create({
      message: `Hero created under id:${hero.id} and name: ${hero.name}`,
      position: 'bottom',
      duration: 15000,
      cssClass: "text-center",
      color: "success"
    });
    toast.present();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T>(operation = 'operation', result?: T) {
    return (err: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(err); // log to console instead
      this.Toast_Error(err.error.errors[Object.getOwnPropertyNames(err.error.errors)[0]][0])
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${err.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(
    public http: HttpClient,
    public toastController: ToastController
  ) { }
}
