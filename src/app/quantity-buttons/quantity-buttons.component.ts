import { CartService } from './../cart.service';
import { DishListService } from './../dish-list.service';
import { Dish } from './../dishes/dish';
import { ShoppingManagerService } from 'src/app/shopping-manager.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-quantity-buttons',
  templateUrl: './quantity-buttons.component.html',
  styleUrls: ['./quantity-buttons.component.css']
})
export class QuantityButtonsComponent implements OnInit {
  @Input() dishID!: string;
  dish!: Dish;
  cart!: number;
  dishes!: Dish[];

  constructor(private data: ShoppingManagerService,
    private dishList: DishListService,
    private cartService: CartService) {

  }

  ngOnInit(): void {
    this.data.currentCart.subscribe(cart => this.cart = cart);
    this.dishes = this.dishList.getDishesArray();
    this.dishes.forEach(dish => {
      if (this.dishID == dish.key) {
        this.dish = dish;
      }
    });
  }

  plus() {
    if (this.dish.ordersLimit > 0) {
      this.dish.ordersLimit -= 1;
      this.data.cartUpdate(this.cart + 1);
      this.cartService.addToCart(this.dish.key, this.dish.name);
      this.dishList.plusOrdersLimit(this.dishID)
    }
  }

  minus() {
    if (this.dish.ordersLimit < this.dish.maxLimit) {
      this.dish.ordersLimit += 1;
      this.data.cartUpdate(this.cart - 1);
      this.cartService.removeFromCart(this.dish.key);
      this.dishList.minusOrdersLimit(this.dishID)
    }
  }

}
