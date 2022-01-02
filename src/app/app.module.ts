
import { environment } from '../environments/environment';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DishesComponent } from './dishes/dishes.component';
import { DishDetailsComponent } from './dishes/dish-details/dish-details.component';
import { RemoveBtnComponent } from './dishes/dish-details/remove-btn/remove-btn.component';
import { AddFormComponent } from './nav-bar/add-form/add-form.component';
import { CartStatusComponent } from './nav-bar/cart-status/cart-status.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StarComponent } from './dishes/dish-details/star/star.component';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { DishComponent } from './dishes/dish-details/dish/dish.component';
import { OpinionFormComponent } from './dishes/dish-details/dish/opinion-form/opinion-form.component';
import { AppRoutingModule } from './app-routing.module';

import { ContactComponent } from './home/contact/contact.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

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
    HomeComponent,
    NotFoundComponent,
    CartComponent,
    DishComponent,
    OpinionFormComponent,
    ContactComponent,


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
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
