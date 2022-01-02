import { DishListService } from './../../dish-list.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dish } from 'src/app/dishes/dish';

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
    ordersLimit: new FormControl('', [Validators.required, Validators.min(1)]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
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
  constructor(private dishes: DishListService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(f: any) {
    let dish: Dish = f.value;
    dish.rating = 0;
    dish.maxLimit = dish.ordersLimit;
    this.dishes.createDish(dish);
    console.log(f.value);
    this.router.navigate(["/dishes/1"])

  }

}