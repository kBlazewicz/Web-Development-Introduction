import { Component, Input, OnInit, Output, OnChanges } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { Dish } from '../dish';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {
  @Input() dish!:Dish;
  @Input() isActivePlus: boolean = false;
  @Input() isActiveMinus: boolean = false;
  @Input() nearToEnd: boolean = false;
  @Input() isMax!: number;
  @Input() isMin!: number;

  initialOrdersLimit!: number;
  converter!: number;
  currency!: string;
  math = Math;
  cart!: number;
  max=10;
  rating=0;
  readonly:boolean=false;

  constructor(private data: ShoppingCartService) { 
  }

  ngOnInit(): void {
  this.initialOrdersLimit=this.dish.ordersLimit;
  this.data.currentConverter.subscribe(converter => this.converter = converter)
  this.data.currentCurrency.subscribe(currency => this.currency = currency)
  this.data.currentCart.subscribe(cart => this.cart = cart)
}

  plus(){
    if(this.dish.ordersLimit>0){
    this.dish.ordersLimit-=1;
    this.data.cartUpdate(this.cart+1);
    }
  }

  minus(){
    if(this.dish.ordersLimit<this.initialOrdersLimit){
      this.dish.ordersLimit+=1;
      this.data.cartUpdate(this.cart-1);
    }
  }
}
