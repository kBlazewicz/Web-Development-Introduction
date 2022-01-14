import { ManagerViewComponent } from './manager-view/manager-view.component';
import { ManagerAuthGuardService } from './manager-auth-guard.service';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { AuthGuardService } from './auth-guard.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
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
  { path: 'dishes/dish/feedback', component: OpinionFormComponent, canActivate: [AuthGuardService] },
  { path: 'dishes/dish', component: DishComponent },
  { path: 'admin-view', component: AdminViewComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
  { path: 'manager-view', component: ManagerViewComponent, canActivate: [AuthGuardService, ManagerAuthGuardService] },
  { path: 'dishes/create', component: AddFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
  { path: 'dishes/:page', component: DishesComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '**', component: NotFoundComponent },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
