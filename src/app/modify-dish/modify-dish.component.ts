import { DishListService } from './../dish-list.service';
import { Dish } from './../dishes/dish';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-modify-dish',
  templateUrl: './modify-dish.component.html',
  styleUrls: ['./modify-dish.component.css']
})
export class ModifyDishComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    cuisine: new FormControl('', [Validators.required, Validators.minLength(1)]),
    type: new FormControl('', [Validators.required, Validators.minLength(1)]),
    category: new FormControl('', [Validators.required, Validators.minLength(1)]),
    ingridients: new FormControl('', [Validators.required, Validators.minLength(1)]),
    ordersLimit: new FormControl('', [Validators.required, Validators.min(1)]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    caption: new FormControl('', [Validators.required, Validators.minLength(1)]),
    photo: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });
  dish!: Dish;

  addDish() {
    this.form.setErrors({
      invalidDish: true
    });
  }

  cart!: number;
  menu!: Dish[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dishListService: DishListService) {
    this.dish = data.dish;
  }



  ngOnInit(): void {
  }

  submit(f: any) {
    let dish: Dish = f.value;
    dish.rating = this.dish.rating;
    dish.maxLimit = Math.max(dish.ordersLimit, this.dish.maxLimit);
    this.dishListService.modifyDish(dish, this.dish.key);
  }

}
