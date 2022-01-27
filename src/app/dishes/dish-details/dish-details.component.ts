import { CartService } from '../../services/cart.service';
import { AuthService } from '../../authorization/auth.service';
import { DishListService } from '../../services/dish-list.service';
import { Component, Input, OnInit } from '@angular/core';
import { Dish } from '../dish';
import { ShoppingManagerService } from 'src/app/services/shopping-manager.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {
  @Input() dish!: Dish;
  @Input() isActivePlus: boolean = false;
  @Input() isActiveMinus: boolean = false;
  @Input() nearToEnd: boolean = false;
  @Input() isMax!: number;
  @Input() isMin!: number;

  converter!: number;
  currency!: string;
  math = Math;
  cart!: number;
  dishes: Dish[] = []
  dishID!: string;

  constructor(private data: ShoppingManagerService,
    private router: Router,
    private dishesService: DishListService,
    public auth: AuthService,
    public cartService: CartService) {
  }

  ngOnInit(): void {
    this.data.currentConverter.subscribe(converter => this.converter = converter);
    this.data.currentCurrency.subscribe(currency => this.currency = currency);
    this.data.currentCart.subscribe(cart => this.cart = cart);
    this.dishID = this.dish.key;
  }

  seeDetails() {
    this.dishesService.updatecurrentDish(this.dish);
    this.cartService.isInCart(this.dish.key);
    this.router.navigate(['/dishes/dish']);
  }
}
