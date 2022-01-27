import { AuthService } from '../authorization/auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingManagerService } from '../services/shopping-manager.service';
import { Dish } from '../dishes/dish';
import 'firebase/compat/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  converter!: number;
  menu!: Dish[];
  currency!: string;
  math = Math;

  constructor(private data: ShoppingManagerService, public auth: AuthService) {
    this.menu = this.data.getDishes();
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

  isChecked() {
    return this.currency == "$";
  }

  logout() {
    this.auth.logout();
  }
}
