import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';
import { DishComponent } from './dishes/dish-details/dish/dish.component';
import { DishesComponent } from './dishes/dishes.component';
import { AddFormComponent } from './nav-bar/add-form/add-form.component';
import { OpinionFormComponent } from './dishes/dish-details/dish/opinion-form/opinion-form.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dishes/dish/feedback', component: OpinionFormComponent },
  { path: 'dishes/dish', component: DishComponent },
  { path: 'dishes/create', component: AddFormComponent },
  { path: 'dishes/:page', component: DishesComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', component: NotFoundComponent },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
