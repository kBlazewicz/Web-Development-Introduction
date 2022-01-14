import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { map, Observable, switchMap } from 'rxjs';
import { AppUser } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  admin = false;
  manager = false;
  user$!: Observable<firebase.User | null>;
  logged = false;
  currentUser!: any;
  persistence = 'local';

  constructor(private afAuth: AngularFireAuth, private router: Router, private userService: UserService) {
    this.user$ = afAuth.authState;
    this.user$.subscribe((User) => {
      if (User === null) {
        this.currentUser = null;
        this.logged = false;
      }
      else {
        this.logged = true;
        this.currentUser = User;
        this.isAdmin();
        this.isManager();

      }
    });
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('You are logged in!');
        this.router.navigate(['']);
        this.logged = true;
      })
      .catch(err => {
        console.log('Something went wrong: ', err.message);
      });
  }

  logout() {
    this.afAuth.signOut();
    console.log('logout');
    this.logged = false;
    this.admin = false;
    this.manager = false;
  }

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(x => {
        this.userService.save(x.user!.email!, x.user!.uid)
        console.log('You are signed up!');
      })
      .catch(error => {
        console.log('Something is wrong: ', error.message);
      });
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(switchMap(user => this.userService.readUser(user!.uid)))
  }

  isLogged() {
    return this.logged;
  }

  isAdmin() {
    return this.appUser$
      .pipe(map(user => user.admin))
      .subscribe(admin => this.admin = admin);
  }

  isManager() {
    return this.appUser$
      .pipe(map(user => user.manager))
      .subscribe(manager => this.manager = manager);
  }

  setPersistence(persistence: string) {
    if (persistence == 'local') {
      this.persistence = persistence;
      return this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    }
    else if (persistence == 'session') {
      this.persistence = persistence;
      return this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    }
    else if (persistence == 'none') {
      this.persistence = persistence;
      return this.afAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);
    }
    else {
      console.log('Error in setting persistence, persistence has been set to local')
      this.persistence = persistence;
      return this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    }
  }
  getPersistence() {
    return this.persistence;
  }
}

