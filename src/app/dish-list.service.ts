import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Dish } from 'src/app/dishes/dish';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DishListService {
  dishes!: Dish[];
  path = '/dishes'
  currentDish!: Dish;

  private dishesRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
    this.dishesRef = db.collection('dishes');
    console.log(db.collection('dishes') + "       get dishes");
  }

  updatecurrentDish(update: Dish) {
    this.currentDish = update;
  }

  getDishesArray() {
    this.getDishesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(dishes => {
      this.dishes = (<Dish[]>dishes);
    });
  }

  getNumberOfDishes() {
    // const [userDetails, setUserDetails] = useState('')
    // this.db.collection('users').doc(id).get()
    //   .then(snapshot => setUserDetails(snapshot.data()))
    return 9;
  }

  getDishesList() {
    return this.dishesRef;
  }

  createDish(dish: Dish): void {
    this.dishesRef.add({ ...dish });
  }

  updateDish(key: string, value: any) {
    return this.dishesRef.doc(key).set(value)
  }

  deleteDish(key: string) {
    this.dishesRef.doc(this.currentDish.key).delete();
  }

}
