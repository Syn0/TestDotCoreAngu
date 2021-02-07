/* PREVIOUS 07/02/2021
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RLCORE';
}
*/

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
