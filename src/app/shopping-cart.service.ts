import { Dish } from 'src/app/dishes/dish';
import { DishListService } from './dish-list.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, last } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  dishes!: Dish[];
  private cartSource = new BehaviorSubject(0);
  private currencySource = new BehaviorSubject("€");
  private converterSource = new BehaviorSubject(1);
  private dishSource = new BehaviorSubject({});


  currentCurrency = this.currencySource.asObservable();
  currentCart = this.cartSource.asObservable();
  currentConverter = this.converterSource.asObservable();
  currentDish = this.dishSource.asObservable();


  constructor(private service: DishListService) {
  }

  changeCurrency(currency: string, converter: number) {
    console.log("service has changed currency");
    this.currencySource.next(currency);
    this.converterSource.next(converter);
  }

  cartUpdate(upd: number) {
    this.cartSource.next(upd);
  }

  getDish(key: string): Dish {
    let temp = this.dishes[0];
    this.dishes.forEach(dish => {
      if (dish.key == key) {
        temp = dish;
      }
    });
    return temp;
  }

  getDishesList() {
    this.service.getDishesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(dishes => {
      this.dishes = (<Dish[]>dishes);
      console.log(this.dishes + "prosze drugi log");
    });
    console.log(this.dishes + "kolejny log");
  }

  getDishes(): Dish[] {
    return this.dishes;
  }
}
