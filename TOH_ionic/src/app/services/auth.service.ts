import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { LoginModel } from "../login/login.page";

    @Injectable({
      providedIn: 'root'
    })
    export class AuthService {
      _login : LoginModel | undefined;
    
      constructor() { }
    
      login(value: LoginModel) {
        this._login = value;
        console.log('TOKEN='+ JSON.stringify(this._login))
        localStorage.setItem('TOKEN', JSON.stringify(this._login));
        return of({ success: this._login != null, login: this._login });
      }
    
      logout() {
        this._login = null;
        localStorage.setItem('TOKEN', '');
        return of({ success: this._login == null, role: '' });
      }
    
      isLoggedIn() {
        return this._login != null;
      }
    
      getTOKEN() {
        console.log('TOKEN.json :');
        console.log(localStorage.getItem('TOKEN'));
        this._login = JSON.parse(localStorage.getItem('TOKEN')) as LoginModel;
        return this._login;
      }
    
    }
