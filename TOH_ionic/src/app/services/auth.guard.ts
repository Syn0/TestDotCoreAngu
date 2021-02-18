import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getTOKEN();
      if (route.data.role && route.data.role.indexOf(userRole.role) === -1) {
        //FAILED -> NO ROLE
        console.log("[LOG.AUTH] Authorizing failed");
        if (route.data.redirect){
          console.log("[LOG.AUTH] Redirecting to : "+route.data.redirect);
          this.router.navigate([route.data.redirect]);
        }
        return false;
      }

      //SUCCESS -> ROLE + LOGIN
      console.log("[LOG.AUTH] Authorizing success");
      return true;
    }
    //FAILED -> NO LOGIN
    console.log("[LOG.AUTH] Authorizing failed");
    if (route.data.redirect){
      console.log("[LOG.AUTH] Redirecting to : "+route.data.redirect);
      this.router.navigate([route.data.redirect]);
    }
    return false;
  }
}
