import {DishListService} from './dish-list.service';
import {CartDish} from '../cart/cart-dish';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firestore from 'firebase/compat/app'
import {AuthService} from '../authorization/auth.service';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {Injectable} from '@angular/core';
import {Observable, map, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartsRef: AngularFirestoreCollection<any>
  user$!: Observable<firebase.User | null>;
  order: CartDish[] = [];
  subscription: any;
  subscription2: any;
  totalQuantity: number = 0;
  totalPrice: number = 0;
  private totalPriceSource = new BehaviorSubject(0);
  currentTotalPrice = this.totalPriceSource.asObservable();
  private totalQuantitySource = new BehaviorSubject(0);
  currentTotalQuantity = this.totalQuantitySource.asObservable();
  private isInCartSource = new BehaviorSubject(false);
  currentIsInCart = this.isInCartSource.asObservable();

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

  isInCartInner(key: string, order: CartDish[]) {
    let x = false;
    order.forEach(element => {
      if (element.key == key) {
        x = true;
      }
    });
    this.isInCartSource.next(x);
  }

  isInCart(key: string) {
    this.subscription = this.getOrder().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()})))
    ).subscribe(items => {
      this.order = <CartDish[]>items;
      this.isInCartInner(key, this.order);
    });
  }

  createCart() {
    this.cartsRef.doc(this.auth.currentUser.uid).set({});
  }

  updateCart() {
    this.subscription = this.getOrder().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()})))
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
        dishesRef.doc(dishID).update({dish: name, quantity: firestore.firestore.FieldValue.increment(1)});
      } else {
        dishesRef.doc(dishID).set({dish: name, quantity: 1});
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
        } else {
          dishesRef.doc(dishID).update({quantity: firestore.firestore.FieldValue.increment(-1)});
        }
      } else {
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

  checkout() {
    const dishesRef = this.db.collection("carts").doc(this.auth.currentUser.uid).collection("dishes");
    this.order.forEach(element => {
      dishesRef.doc(element.key).delete();
    });
  }

}
