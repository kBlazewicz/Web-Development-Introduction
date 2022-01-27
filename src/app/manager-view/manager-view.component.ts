import { ModifyDishComponent } from './modify-dish/modify-dish.component';
import { Dish } from '../dishes/dish';
import { map } from 'rxjs';
import { DishListService } from '../services/dish-list.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css']
})
export class ManagerViewComponent implements OnInit {
  dishes: Dish[] = [];

  constructor(private dishListService: DishListService, private dialog: MatDialog) {
    this.getDishesList();
  }

  ngOnInit(): void {
  }

  getDishesList() {
    this.dishListService.getDishesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(dishes => {
      this.dishes = (<Dish[]>dishes);
    });
  }

  openDialog(dish: Dish) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      dish: dish
    };
    this.dialog.open(ModifyDishComponent, dialogConfig);
  }
}
