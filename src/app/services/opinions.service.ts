import { Opinion } from '../dishes/dish-details/dish/opinion-form/opinion';
import 'firebase/compat/auth';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpinionsService {
  subscription: any;
  private opinionsRef: AngularFirestoreCollection<any>;
  opinions: Opinion[] = [];

  constructor(private db: AngularFirestore) {
    this.opinionsRef = db.collection('opinions');

  }

  getOpinionsRef(dishKey: string) {
    return this.db.collection('opinions').doc(dishKey);
  }

  addOpinion(dishKey: string, text: string, date: Date | null, email: string) {
    const opinionsRef = this.db.collection("opinions").doc(dishKey).collection("dish_opinion");
    opinionsRef.doc(dishKey).get().pipe(map(snapshot => {
      return snapshot.exists;
    })).subscribe(() => {
      opinionsRef.doc().set({
        email: email,
        opinion: text,
        date: date,
        dishKey: dishKey
      });
    });
  }
}
