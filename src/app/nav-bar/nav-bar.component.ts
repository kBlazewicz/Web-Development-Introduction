import { AddFormComponent } from './add-form/add-form.component';
import { Component, OnInit, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingCartService } from '../shopping-cart.service';
import { Dish } from '../dishes/dish';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  converter!: number;
  menu!: Dish[];
  filteredDishes!: Dish[];
  currency!: string;
  math = Math;

  constructor(private data: ShoppingCartService, private dialog: MatDialog) {
    this.data.currentMenu.subscribe(menu => this.menu = menu);
    this.data.currentMenu.subscribe(menu => this.filteredDishes = menu);

  }

  ngOnInit(): void {
    this.data.currentConverter.subscribe(converter => this.converter = converter)
    this.data.currentCurrency.subscribe(currency => this.currency = currency)
  }

  onChange() {
    if (this.currency == "€") {
      this.data.changeCurrency("$", 0.89);
      return;
    }
    this.data.changeCurrency("€", 1);
  }

  openDialog() {
    this.dialog.open(AddFormComponent);
  }

  filter(query: string) {
    this.filteredDishes = (query) ?
      this.filteredDishes.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) : this.menu;

  }
  isChecked() {
    if (this.currency == "$") {
      return true;
    }
    return false;
  }
}
