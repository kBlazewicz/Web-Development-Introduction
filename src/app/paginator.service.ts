import { ShoppingManagerService } from 'src/app/shopping-manager.service';
import { Dish } from 'src/app/dishes/dish';
import { DishListService } from './dish-list.service';
import { BehaviorSubject, map } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {
  dishes!: Dish[];
  numberOfElements = 9;
  numberOfPages = 1;

  private numberOfElementsSource = new BehaviorSubject(9);
  currentNumberOfElements = this.numberOfElementsSource.asObservable();

  private pageSource = new BehaviorSubject(1);
  currentPage = this.pageSource.asObservable();

  private numberOfPagesSource = new BehaviorSubject(1);
  currentNumberOfPages = this.numberOfPagesSource.asObservable();

  private pagesArraySource = new BehaviorSubject([1]);
  currentPagesArray = this.pagesArraySource.asObservable();


  constructor(private service: ShoppingManagerService, private dishesService: DishListService) {
    this.calculatePages();
  }

  changeNumberOfElements(upd: number) {
    this.numberOfElementsSource.next(upd);
    this.numberOfElements = upd;
    this.calculatePages();
  }

  calculatePages() {
    let pages = Math.ceil(this.getNumberOfDishes() /
      this.numberOfElements);
    this.numberOfPagesSource.next(pages);
    this.numberOfPages = pages;
    this.updatePagesArray();
  }


  updatePagesArray() {
    let array = [];
    for (let i = 1; i <= this.numberOfPages; i++) {
      array.push(i);
    }
    this.pagesArraySource.next(array);
  }

  changePage(page: number) {
    this.pageSource.next(page);
  }

  getNumberOfDishes() {
    return this.dishesService.getNumberOfDishes();
  }
}
