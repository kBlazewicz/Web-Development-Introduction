import { CartService } from './../../cart.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingManagerService } from 'src/app/shopping-manager.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  cart!: number;

  constructor(private data: ShoppingManagerService,
    public cartService: CartService) {
  }

  ngOnInit(): void {
    this.data.currentCart.subscribe(cart => this.cart = cart)
    this.cartService.updateCart();
  }

}
