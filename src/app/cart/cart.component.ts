import { CartService } from './../cart.service';
import { ShoppingManagerService } from 'src/app/shopping-manager.service';
import { CartDish } from './cart-dish';
import { map } from 'rxjs';
;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  order: CartDish[] = [];
  totalPrice!: number;
  totalQuantity!: number;
  converter!: number;
  currency!: string;
  math = Math;



  constructor(public cartService: CartService, private data: ShoppingManagerService, private router: Router) {
  }

  ngOnInit(): void {
    this.cartService.currentTotalPrice.subscribe(totalPrice => this.totalPrice = totalPrice);
    this.cartService.currentTotalQuantity.subscribe(totalQuantity => this.totalQuantity = totalQuantity);
    this.data.currentConverter.subscribe(converter => this.converter = converter);
    this.data.currentCurrency.subscribe(currency => this.currency = currency);
    this.getOrder();
  }


  createCart() {
    this.cartService.createCart();
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

  checkout() {
    this.cartService.checkout();
  }
}
