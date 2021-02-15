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




  /*
  Déclaration obligatoire d'un service dans un constructeur 
  (car raison: Dependency Injection)
  */
  constructor(public heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.herolist = this.heroService.getHeroes();
  }
}
