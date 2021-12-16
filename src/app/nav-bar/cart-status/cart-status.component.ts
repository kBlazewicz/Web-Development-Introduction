import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  cart!: number;

  constructor(private data: ShoppingCartService) { 
  }

  ngOnInit(): void {
    this.data.currentCart.subscribe(cart => this.cart = cart)
  }

}
