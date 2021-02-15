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

  newhero: Hero = {
    id: -1,
    name: '',
    xp: 0,
  };
  constructor(public modalController: ModalController, public heroService: HeroService) { }

  ngOnInit() {
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
      this.heroService.addHero({ name: this.newhero.name, xp: this.newhero.xp}).subscribe(x => {
        this.dismiss();
      });
  }

}
