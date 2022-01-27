import { AppUser } from './user';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
    this.userRef = db.collection('users');
  }

  save(email: string, uid: string) {
    this.userRef.doc(uid).set({
      key: uid,
      email: email,
      admin: false,
      manager: false,
      ban: false
    });
  }

  readUser(uid: string): Observable<AppUser> {
    return this.userRef.doc(uid).valueChanges();
  }

  getUsers() {
    return this.userRef.snapshotChanges();
  }

  ban(user: AppUser) {
    return this.userRef.doc(user.key).set({
      ban: true,
      email: user.email,
      manager: user.manager,
      admin: user.admin
    })
  }

  unban(user: AppUser) {
    return this.userRef.doc(user.key).set({
      manager: user.manager,
      ban: false,
      email: user.email,
      admin: user.admin
    })
  }

  makeManager(user: AppUser) {
    return this.userRef.doc(user.key).set({
      manager: true,
      ban: user.ban,
      email: user.email,
      admin: user.admin
    })
  }

  unmakeManager(user: AppUser) {
    return this.userRef.doc(user.key).set({
      manager: false,
      ban: user.ban,
      email: user.email,
      admin: user.admin
    })
  }

  makeAdmin(user: AppUser) {
    return this.userRef.doc(user.key).set({
      manager: user.manager,
      ban: user.ban,
      email: user.email,
      admin: true
    })
  }

  unmakeAdmin(user: AppUser) {
    return this.userRef.doc(user.key).set({
      manager: user.manager,
      ban: user.ban,
      email: user.email,
      admin: false
    })
  }

}
