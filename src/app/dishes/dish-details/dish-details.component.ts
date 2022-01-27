import { CartService } from './../../cart.service';
import { AuthService } from './../../auth.service';
import { DishListService } from './../../dish-list.service';
import { Component, Input, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { Dish } from '../dish';
import { ShoppingManagerService } from 'src/app/shopping-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { map } from 'rxjs';

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

  getDishesList() {
    this.dishesService.getDishesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(dishes => {
      this.dishes = (<Dish[]>dishes);
    });
  }

  seeDetails() {
    this.dishesService.updatecurrentDish(this.dish);
    this.cartService.isInCart(this.dish.key);
    this.router.navigate(['/dishes/dish']);
  }
}
