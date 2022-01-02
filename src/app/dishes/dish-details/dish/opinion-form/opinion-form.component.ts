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
  opinions: Opinion[] = [{
    id: 0, username: "brzeczyk", text: "afasdfasdfjkbasdjkfbasdbfhjasbdkfjhbasdfkjhbdshjbfjhasbdfhkjbkhjdsabj",
    date: null, dishKey: "pierogi"
  }];
  dish!: Dish;
  counter = 1;
  form = new FormGroup({
    id: new FormControl(this.counter),
    username: new FormControl("", [Validators.required]),
    text: new FormControl("", [Validators.required, Validators.minLength(50), Validators.maxLength(500)]),
    date: new FormControl(),
    dishKey: new FormControl("", [Validators.required])
  });

  constructor(private dishesService: DishListService,
    private router: Router) { }

  ngOnInit(): void {

  }

  submit() {
    this.counter++;
    this.opinions.push(this.form.value)
    this.form.reset();
  }

  goBack() {
    this.router.navigate(['/dishes/dish'])
  }

}
