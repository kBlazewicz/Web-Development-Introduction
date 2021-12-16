import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { Dish } from '../../dish';

@Component({
  selector: 'app-remove-btn',
  templateUrl: './remove-btn.component.html',
  styleUrls: ['./remove-btn.component.css']
})
export class RemoveBtnComponent implements OnInit {
  @Input() dish! : Dish;
  @Input() initialDishLimit! : number;


  menu!: Dish[];
  cart!: number;

  constructor(private data: ShoppingCartService){}

  ngOnInit(): void {
    this.data.currentMenu.subscribe(menu => this.menu = menu);
    this.data.currentCart.subscribe(cart => this.cart = cart);
  }

  onClick(){
    this.data.cartUpdate(this.cart - (this.initialDishLimit-this.dish.ordersLimit));
    this.menu.splice(this.menu.indexOf(this.dish),1);
    console.log(this.initialDishLimit,this.dish.ordersLimit);
  }
}
