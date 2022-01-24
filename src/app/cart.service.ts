import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { DishListService } from './dish-list.service';
import { Dish } from './dishes/dish';
import { CartDish } from './cart/cart-dish';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firestore from 'firebase/compat/app'
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable, map, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartsRef: AngularFirestoreCollection<any>
  user$!: Observable<firebase.User | null>;
  order!: any;
  subscription: any;
  subscription2: any;
  totalQuantity: number = 0;
  totalPrice: number = 0;
  private totalPriceSource = new BehaviorSubject(0);
  currentTotalPrice = this.totalPriceSource.asObservable();
  private totalQuantitySource = new BehaviorSubject(0);
  currentTotalQuantity = this.totalQuantitySource.asObservable();


  constructor(private db: AngularFirestore, private auth: AuthService, private dishList: DishListService) {
    this.cartsRef = this.db.collection('carts');
  }

  ngOnInit(): void {
    this.updateCart();
  }

  calculateNumber(order: CartDish[]) {
    this.totalQuantity = 0;
    this.totalPrice = 0
    order.forEach(position => {
      this.totalQuantity += position.quantity;
      this.totalPrice += this.dishList.getPrice(position.key) * position.quantity;
    });

    this.totalPriceSource.next(this.totalPrice);
    this.totalQuantitySource.next(this.totalQuantity);

  }

  createCart() {
    this.cartsRef.doc(this.auth.currentUser.uid).set({});
    console.log("new cart ")
  }

  updateCart() {
    this.subscription = this.getOrder().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() })))
    ).subscribe(items => {
      this.order = <CartDish[]>items;
      this.calculateNumber(this.order);
    });
  }

  addToCart(dishID: string, name: string) {
    const dishesRef = this.db.collection("carts").doc(this.auth.currentUser.uid).collection("dishes");
    dishesRef.doc(dishID).get().pipe(map(snapshot => {
      return snapshot.exists;
    })).subscribe(exist => {
      if (exist) {
        dishesRef.doc(dishID).update({ dish: name, quantity: firestore.firestore.FieldValue.increment(1) });
      }
      else {
        console.log("crated dish")
        dishesRef.doc(dishID).set({ dish: name, quantity: 1 });
      }
    });
    this.updateCart();
  }


  removeFromCart(dishID: string) {
    const dishesRef = this.db.collection("carts").doc(this.auth.currentUser.uid).collection("dishes");
    dishesRef.doc(dishID).get().pipe(map(snapshot => {
      return snapshot.data();
    })).subscribe(x => {
      if (x) {
        if (x["quantity"] == 1) {
          dishesRef.doc(dishID).delete();
        }
        else {
          dishesRef.doc(dishID).update({ quantity: firestore.firestore.FieldValue.increment(-1) });
        }
      }
      else {
        console.log("there is no dish with this id")
      }
    });
    this.updateCart();
  }

  getOrder() {
    return this.db.collection('carts').doc(this.auth.currentUser.uid).collection('dishes');
  }

  getTotalQuantity() {
    return this.totalQuantity;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

}
