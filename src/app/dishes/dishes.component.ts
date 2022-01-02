import { PaginatorService } from './../paginator.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Dish } from './dish';
import { ActivatedRoute, Router } from '@angular/router';

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
  menu!: Dish[];
  filteredDishes!: Dish[];
  isMax!: number;
  isMin!: number;

  constructor(private data: ShoppingCartService,
    private paginator: PaginatorService,
    private route: ActivatedRoute,
    private router: Router) {

    this.data.currentMenu.subscribe(menu => this.menu = menu)
    this.data.currentMenu.subscribe(menu => this.filteredDishes = menu);
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

    let min = 9999999;
    let max = 0;
    this.menu.forEach(dish => {
      if (dish.price < min) min = dish.price;
      if (dish.price > max) max = dish.price;
    });
    this.isMax = max;
    this.isMin = min;
  }

  filter(query: string) {
    this.filteredDishes = (query) ?
      this.filteredDishes.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.ingridients.toLowerCase().includes(query.toLowerCase()) ||
        p.type.toLowerCase().includes(query.toLowerCase()) ||
        p.cuisine.toLowerCase().includes(query.toLowerCase())) : this.menu;
  }

  updatePages() {
    this.paginator.changeNumberOfElements(+this.number);
    this.paginator.calculatePages();
    console.log("Number of elements on page has changed" + +this.numberOfElements);
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



