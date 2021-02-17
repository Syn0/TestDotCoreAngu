import { environment } from './../environments/environment';
import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { InMemHeroService } from './services/in-mem-hero.service';
import { HeroService } from './services/hero.service';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  constructor(
  ) {
    this.initializeApp();
  }

  initializeApp() {
    /* To make sure we provide the fastest app loading experience 
       for our users, hide the splash screen automatically 
       when the app is ready to be used:
        
        https://capacitor.ionicframework.com/docs/apis/splash-screen#hiding-the-splash-screen
    */
    if (!environment.production) SplashScreen.hide();
    
  }
}

export class Utils {
  public removeA(arr: Array<any>) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
      what = a[--L];
      while ((ax = arr.indexOf(what)) !== -1) {
        arr.splice(ax, 1);
      }
    }
    return arr;
  }
}
