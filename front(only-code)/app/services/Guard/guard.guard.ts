import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private router: Router, auth: AuthService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuthorized: boolean = localStorage.getItem('currentUser') != null;
    console.log(isAuthorized);
    console.log(state.url);

    if (!isAuthorized && state.url.search('main') != -1) {
      this.router.navigate(['auth/login']);
      return false;
    } else if (isAuthorized && state.url.search('auth') != -1) {
      this.router.navigate(['main']);
      return false;
    }
    return true;
  }

}
