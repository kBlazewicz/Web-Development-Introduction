import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerAuthGuardService {

  constructor(private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.appUser$.pipe(map(appUser => (appUser.manager || appUser.admin)));
  }
}
