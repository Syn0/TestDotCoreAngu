import { HeroCreatePageModule } from './hero-create/hero-create.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemHeroService } from './services/in-mem-hero.service';
import { environment } from 'src/environments/environment';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HeroCreatePageModule,

    //MODULES INMEMORY + LOCALSTORAGE
    HttpClientInMemoryWebApiModule.forRoot(InMemHeroService, { delay: 500 }),
    IonicStorageModule.forRoot({storeName: 'IonicOfflineDB'}),

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },InMemHeroService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  singletonIMS = null;

}
