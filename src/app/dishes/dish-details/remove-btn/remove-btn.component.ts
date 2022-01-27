import { DishListService } from '../../../services/dish-list.service';
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingManagerService } from 'src/app/services/shopping-manager.service';
import { Dish } from '../../dish';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remove-btn',
  templateUrl: './remove-btn.component.html',
  styleUrls: ['./remove-btn.component.css']
})
export class RemoveBtnComponent implements OnInit {
  @Input() dish!: Dish;

  cart!: number;

  constructor(private data: ShoppingManagerService, private dishesService: DishListService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.data.currentCart.subscribe(cart => this.cart = cart);
  }

  onClick() {
    this.data.cartUpdate(this.cart - (this.dish.maxLimit - this.dish.ordersLimit));
    this.dishesService.deleteDish(this.dish.key);
    this.router.navigate(['/dishes/1']);
  }
}
