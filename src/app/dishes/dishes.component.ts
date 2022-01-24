import { DishListService } from './../dish-list.service';
import { PaginatorService } from './../paginator.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Dish } from './dish';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})

export class DishesComponent implements OnInit {
  page!: number;
  numberOfPages!: number;
  numberOfElements!: number;
  number = this.numberOfElements;
  pagesArray!: number[];
  dishes: Dish[] = [];
  filteredDishes!: Dish[];
  isMax!: number;
  isMin!: number;

  constructor(private data: ShoppingCartService,
    private paginator: PaginatorService,
    private route: ActivatedRoute,
    private router: Router,
    private dishesService: DishListService) {

    this.getDishesList();
    this.filteredDishes = this.dishes;
    this.paginator.currentNumberOfElements.subscribe(numberOfElements => this.numberOfElements = numberOfElements)
    this.paginator.currentNumberOfPages.subscribe(numberOfPages => this.numberOfPages = numberOfPages)
    this.paginator.currentPagesArray.subscribe(pagesArray => this.pagesArray = pagesArray)
    this.paginator.currentPage.subscribe(page => this.page = page)
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get("page") != null) {
        let page = +params.get("page")!;
        this.paginator.changePage(page);
      }
    });
  }

  getDishesList() {
    this.dishesService.getDishesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(dishes => {
      this.filteredDishes = (<Dish[]>dishes);
      this.dishes = (<Dish[]>dishes);
      this.isMin = this.getMinPrice(this.dishes);
      this.isMax = this.getMaxPrice(this.dishes);
    });
  }

  getMaxPrice(dishes: Dish[]) {
    return dishes.sort((a, b) => (a.price - b.price))[0].price;
  }

  getMinPrice(dishes: Dish[]) {
    return dishes.sort((a, b) => (a.price - b.price))[this.dishes.length - 1].price;
  }

  filter(query: string) {
    this.filteredDishes = (query) ?
      this.filteredDishes.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.ingredients.toLowerCase().includes(query.toLowerCase()) ||
        p.type.toLowerCase().includes(query.toLowerCase()) ||
        p.cuisine.toLowerCase().includes(query.toLowerCase())) : this.dishes;
  }

  updatePages() {
    this.paginator.changeNumberOfElements(+this.number);
    this.paginator.calculatePages();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.numberOfPages) {
      if (page != this.page) {
        this.router.navigate(['dishes', page])
      }
      this.paginator.changePage(page);
    }
  }
  isActive(page: number) {
    return page == this.page;
  }
}



