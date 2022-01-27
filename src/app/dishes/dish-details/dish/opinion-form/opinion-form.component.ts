import { map } from 'rxjs';
import { CartService } from './../../../../cart.service';
import { AuthService } from './../../../../auth.service';
import { OpinionsService } from './../../../../opinions.service';
import { DishListService } from './../../../../dish-list.service';
import { Dish } from 'src/app/dishes/dish';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Opinion } from './opinion';

@Component({
  selector: 'app-opinion-form',
  templateUrl: './opinion-form.component.html',
  styleUrls: ['./opinion-form.component.css']
})
export class OpinionFormComponent implements OnInit {
  dish!: Dish;
  counter = 1;
  form = new FormGroup({
    text: new FormControl("", [Validators.required, Validators.minLength(50), Validators.maxLength(500)]),
    date: new FormControl(),
  });
  opinions: Opinion[] = [];
  isInCart = false;


  constructor(private dishesService: DishListService,
    private router: Router,
    private opinonsService: OpinionsService,
    public auth: AuthService,
    private cartService: CartService) {
    this.dish = this.dishesService.currentDish;
    this.opinions = this.dishesService.getCurrentOpinions();
    console.log(this.opinions)
    console.log
  }

  ngOnInit(): void {
    this.opinonsService.getOpinionsRef(this.dish.key).
      collection('dish_opinion').snapshotChanges().pipe(
        map(changes => changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() })))
      ).subscribe(items => {
        console.log(<Opinion[]>items + "<___")
        this.opinions = <Opinion[]>items;
      });;;
    this.cartService.currentIsInCart.subscribe(isInCart => this.isInCart = isInCart);
  }

  submit() {
    var date: Date | null;
    if (this.form.value.date != null) {
      date = this.form.value.date;
    }
    else {
      date = null;
    }
    if (this.dish == undefined) {
      console.log("if dish id is undefined it means that you have refreshed page hear")
    }
    this.opinonsService.addOpinion(this.dish.key, this.form.value.text, date, this.auth.currentUser.email)
    this.form.reset();
  }

}
