import { DishListService } from './dish-list.service';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, last } from 'rxjs';
import { Dish } from './dishes/dish';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  private cartSource = new BehaviorSubject(0);
  private currencySource = new BehaviorSubject("€");
  private converterSource = new BehaviorSubject(1);
  private dishSource = new BehaviorSubject({});
  private menuSource!: BehaviorSubject<Dish[]>;


  currentCurrency = this.currencySource.asObservable();
  currentCart = this.cartSource.asObservable();
  currentConverter = this.converterSource.asObservable();
  currentDish = this.dishSource.asObservable();
  currentMenu!: { subscribe: (arg0: (menu: any) => any) => void; };


  constructor(private service: DishListService) {
    this.menuSource = new BehaviorSubject(service.getDishes());
    this.currentMenu = this.menuSource.asObservable();

  }

  changeCurrency(currency: string, converter: number) {
    console.log("service has changed currency");
    this.currencySource.next(currency);
    this.converterSource.next(converter);
  }

  cartUpdate(upd: number) {
    this.cartSource.next(upd);
  }

  getDish(id: number) {
    return this.service.getDish(id);
  }
}
