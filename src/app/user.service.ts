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
    });
  }

  readUser(uid: string): Observable<AppUser> {
    return this.userRef.doc(uid).valueChanges();
  }
}
