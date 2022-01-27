import { CartDish } from './cart/cart-dish';
import { CartService } from './cart.service';
import { Dish } from './dishes/dish';
import { DishListService } from './dish-list.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, last } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ShoppingManagerService {
  dishes!: Dish[];
  private cartSource = new BehaviorSubject(0);
  private currencySource = new BehaviorSubject("€");
  private converterSource = new BehaviorSubject(1);
  private dishSource = new BehaviorSubject({});


  currentCurrency = this.currencySource.asObservable();
  currentCart = this.cartSource.asObservable();
  currentConverter = this.converterSource.asObservable();
  currentDish = this.dishSource.asObservable();
  order!: CartDish[];


  constructor(private service: DishListService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.getOrder();
  }

  changeCurrency(currency: string, converter: number) {
    this.currencySource.next(currency);
    this.converterSource.next(converter);
  }

  cartUpdate(upd: number) {
    this.cartService.getOrder();
    this.cartSource.next(upd);
  }

  getOrder() {
    this.cartService.getOrder().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(order => {
      this.order = <CartDish[]>order;
    });
  }

  getDish(key: string): Dish {
    let temp!: Dish;
    this.dishes.forEach(dish => {
      if (dish.key == key) {
        temp = dish;
      }
    });
    return temp;
  }

  getDishes(): Dish[] {
    return this.dishes;
  }
}
