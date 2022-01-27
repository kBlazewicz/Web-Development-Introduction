import { CartService } from './cart.service';
import { OpinionsService } from './opinions.service';
import { Opinion } from './dishes/dish-details/dish/opinion-form/opinion';

import 'firebase/compat/auth';
import firestore from 'firebase/compat/app'
import { Dish } from './dishes/dish';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { map, switchMap, Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DishListService {
  dishes!: Dish[];
  path = 'dishes_final'
  currentDish!: Dish;
  currentDishOpinions: Opinion[] = [];


  private dishesRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore, private opionionsService: OpinionsService) {
    this.dishesRef = db.collection(this.path);
    this.getDishesArray();
  }
  getCurrentOpinions() {
    return this.currentDishOpinions;
  }

  updatecurrentDish(update: Dish) {
    this.currentDish = update;
  }

  getDishesArray(): Dish[] {
    this.getDishesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(dishes => {
      this.dishes = (<Dish[]>dishes);
    });
    return this.dishes;
  }


  getDishesList() {
    return this.dishesRef;
  }
  getDishes() {
    return this.db.collection(this.path)

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

  minusOrdersLimit(key: string) {
    this.dishesRef.doc(key).get().pipe(map(snapshot => {
      return snapshot.exists;
    })).subscribe(exist => {
      if (exist) {
        this.dishesRef.doc(key).update({ ordersLimit: firestore.firestore.FieldValue.increment(1) });
      }
      else {
        console.log("error in dish-list service, changeOrdersLimit")
      }
    });
  }

  plusOrdersLimit(key: string) {
    this.dishesRef.doc(key).get().pipe(map(snapshot => {
      return snapshot.exists;
    })).subscribe(exist => {
      if (exist) {
        this.dishesRef.doc(key).update({ ordersLimit: firestore.firestore.FieldValue.increment(-1) });
      }
      else {
        console.log("error in dish-list service, changeOrdersLimit")
      }
    });
  }

  getPrice(key: string) {
    var price = 0;
    this.dishes.forEach(element => {
      if (key == element.key) {
        price = element.price;
      }
    });
    return price;
  }

  getNumberOfDishes() {
    var cnt = 0;
    this.dishes.forEach(element => {
      cnt += 1;
    });
    return cnt;
  }

  modifyDish(m: Dish, key: string) {
    this.dishesRef.doc(key).set({
      name: m.name,
      cuisine: m.cuisine,
      type: m.type,
      category: m.category,
      ingredients: m.ingredients,
      ordersLimit: m.ordersLimit,
      price: m.price,
      caption: m.caption,
      photo: m.photo,
      maxLimit: m.maxLimit,
      rating: m.rating,
      rating_amount: m.rating_amount
    });
  }
  rateDish(rate: number) {
    this.currentDish.rating = (this.currentDish.rating * this.currentDish.rating_amount + rate) / (this.currentDish.rating_amount + 1);
    this.currentDish.rating_amount += 1;
    this.modifyDish(this.currentDish, this.currentDish.key)
  }
}
