import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/dishes/dish';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  cart!: number;
  menu!: Dish[];
  constructor(private data: ShoppingCartService) { }

  ngOnInit(): void {
    this.data.currentMenu.subscribe(menu => this.menu = menu);
    this.data.currentCart.subscribe(cart => this.cart = cart);
  }

  submit(f: any){
  let dish: Dish = f.value;
  this.menu.push(dish);
  console.log(f.value);
  }

}
