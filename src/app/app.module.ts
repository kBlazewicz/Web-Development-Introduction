import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DishesComponent } from './dishes/dishes.component';
import { DishDetailsComponent } from './dishes/dish-details/dish-details.component';
import { RemoveBtnComponent } from './dishes/dish-details/remove-btn/remove-btn.component';
import { AddFormComponent } from './nav-bar/add-form/add-form.component';
import { CartStatusComponent } from './nav-bar/cart-status/cart-status.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { StarComponent } from './dishes/dish-details/star/star.component';

@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    DishDetailsComponent,
    NavBarComponent,
    RemoveBtnComponent,
    AddFormComponent,
    CartStatusComponent,
    StarComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
