import { HeroService } from './../services/hero.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Hero } from '../models/hero';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.page.html',
  styleUrls: ['./hero-create.page.scss'],
})
export class HeroCreatePage implements OnInit {

  public newhero = {
    name: '',
    xp: 0,
    xP2: 0,
    description: ''
  };
  constructor(public modalController: ModalController, public heroService: HeroService) { 
 

  }

  ngOnInit() {
    if(this.heroService.copiedhero != null) {
      console.log("APPLY PASTE");
      console.log(this.heroService.copiedhero);
      this.newhero.name = this.heroService.copiedhero.name;
      this.newhero.xp = this.heroService.copiedhero.xp;
      this.newhero.xP2 = this.heroService.copiedhero.xP2;
      this.newhero.description = this.heroService.copiedhero.description;
    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  create() {
    if (this.newhero.name != "")
      this.heroService.addHero(this.newhero as Hero)
      .subscribe(
        (data) => {
          this.heroService.hs.push(data);
          this.heroService.Toast_Created(data);
          this.dismiss();
        },
        (error) => error
      );
  }

}
