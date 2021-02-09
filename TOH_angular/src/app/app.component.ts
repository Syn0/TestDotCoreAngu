
import { Component } from '@angular/core';
import { HeroService } from './hero.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RLCORE';

  
  /*
  Déclaration obligatoire d'un service dans un constructeur 
  (car raison: Dependency Injection)
  */
  constructor(
    public heroService: HeroService,
    public location: Location,
    public route: ActivatedRoute) { }
}

/* 09/02/2021
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _httpService: Http) { }
  accessPointUrl: string = 'https://localhost:44393/api/Students';
  apiValues: string[] = [];
  ngOnInit() {
    this._httpService.get(this.accessPointUrl).subscribe(values => {
      this.apiValues = values.json() as string[];
    });
  }
}
*/