import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Dish } from './dish';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})

export class DishesComponent implements OnInit {
  menu!: Dish[];
  isMax!: number;
  isMin!: number;

  constructor(private data: ShoppingCartService) {
    this.data.currentMenu.subscribe(menu => this.menu = menu)
  }

  ngOnInit(): void {
    let min = 9999999;
    let max = 0;
    this.menu.forEach(dish => {
      if (dish.price < min) min = dish.price;
      if (dish.price > max) max = dish.price;
    });
    this.isMax = max;
    this.isMin = min;
  }
}



