import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dish } from 'src/app/dishes/dish';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    cuisine: new FormControl('', [Validators.required, Validators.minLength(1)]),
    type: new FormControl('', [Validators.required, Validators.minLength(1)]),
    category: new FormControl('', [Validators.required, Validators.minLength(1)]),
    ingridients: new FormControl('', [Validators.required, Validators.minLength(1)]),
    ordersLimit: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    caption: new FormControl('', [Validators.required, Validators.minLength(1)]),
    photo: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  addDish() {
    this.form.setErrors({
      invalidDish: true
    });
  }

  cart!: number;
  menu!: Dish[];
  constructor(private data: ShoppingCartService, private router: Router) { }

  ngOnInit(): void {
    this.data.currentMenu.subscribe(menu => this.menu = menu);
    this.data.currentCart.subscribe(cart => this.cart = cart);
  }

  submit(f: any) {
    let dish: Dish = f.value;
    dish.id = this.menu.length + 1;
    dish.maxLimit = dish.ordersLimit;
    this.menu.push(dish);
    console.log(f.value);
    this.router.navigate(["/dishes"])

  }

}