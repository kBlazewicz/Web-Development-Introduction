import { AuthService } from './../../../auth.service';
import { DishListService } from './../../../dish-list.service';
import { Opinion } from './opinion-form/opinion';
import { PaginatorService } from './../../../paginator.service';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { Dish } from 'src/app/dishes/dish';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  page!: number;
  initialOrdersLimit!: number;
  converter!: number;
  currency!: string;
  math = Math;
  cart!: number;
  stars = [1, 2, 3, 4, 5]
  rating = 1;
  isRated = false;
  hoverState = 0;
  filteredOpinions!: Opinion[];
  dish!: Dish;
  opinions!: Opinion[];

  constructor(private service: ShoppingCartService,
    private route: ActivatedRoute,
    private router: Router,
    private paginator: PaginatorService,
    private dishesService: DishListService,
    public auth: AuthService) {
    this.dish = this.dishesService.currentDish;
  }

  ngOnInit(): void {
    this.initialOrdersLimit = this.dish.ordersLimit;
    this.service.currentConverter.subscribe(converter => this.converter = converter)
    this.service.currentCurrency.subscribe(currency => this.currency = currency)
    this.service.currentCart.subscribe(cart => this.cart = cart)
    this.paginator.currentPage.subscribe(page => this.page = page)
    if (this.dish == null) {
      this.router.navigate(['/dishes/1']);
    }
  }

  plus() {
    if (this.dish.ordersLimit > 0) {
      this.dish.ordersLimit -= 1;
      this.service.cartUpdate(this.cart + 1);
    }

  }

  minus() {
    if (this.dish.ordersLimit < this.dish.maxLimit) {
      this.dish.ordersLimit += 1;
      this.service.cartUpdate(this.cart - 1);
    }
  }

  onStarEnter(starID: number) {
    this.hoverState = starID;
  }
  onStarLeave() {
    this.hoverState = 0;
  }
  onStarClicked(starID: number) {
    this.rating = starID;
  }

  addOpinion() {
    this.router.navigate(['/dishes/dish/feedback']);
  }

  goBack() {
    this.router.navigate(['/dishes', this.page])
  }


}
