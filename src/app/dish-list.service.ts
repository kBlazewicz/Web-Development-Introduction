import { Injectable } from '@angular/core';
import { Dish } from './dishes/dish';

@Injectable({
  providedIn: 'root'
})
export class DishListService {
  dishes: Dish[] = [{ id: 12, name: "palak paneer", cuisine: "Indian", type: "main course", category: "vegan", ingridients: "nuts tofu  rice", ordersLimit: 10, price: 20, caption: "Palak paneer is a classic curry dish from North Indian cuisine made with fresh spinach, onions, spices, paneer and herbs. 'Palak' is a Hindi word for 'Spinach' and 'Paneer' is 'Indian cottage cheese'", photo: 'https://picsum.photos/id/237/1280/720', maxLimit: 10 },
  { id: 1, name: "pierogi", cuisine: "Polish", type: "main course", category: "vegetarian", ingridients: "nuts tofu  rice", ordersLimit: 10, price: 30, caption: "Palak paneer is a classic curry dish from North Indian cuisine made with fresh spinach, onions, spices, paneer and herbs. 'Palak' is a Hindi word for 'Spinach' and 'Paneer' is 'Indian cottage cheese'", photo: 'https://picsum.photos/id/238/1280/720', maxLimit: 10 },
  { id: 2, name: "curry", cuisine: "French", type: "side", category: "regular (with meat)", ingridients: "nuts tofu  rice", ordersLimit: 10, price: 20.15, caption: "Palak paneer is a classic curry dish from North Indian cuisine made with fresh spinach, onions, spices, paneer and herbs. 'Palak' is a Hindi word for 'Spinach' and 'Paneer' is 'Indian cottage cheese'", photo: 'https://picsum.photos/id/239/1280/720', maxLimit: 10 },
  { id: 3, name: "palak paneer", cuisine: "Indian", type: "main course", category: "vegan", ingridients: "nuts tofu  rice", ordersLimit: 10, price: 40, caption: "Palak paneer is a classic curry dish from North Indian cuisine made with fresh spinach, onions, spices, paneer and herbs. 'Palak' is a Hindi word for 'Spinach' and 'Paneer' is 'Indian cottage cheese'", photo: 'https://picsum.photos/id/229/1280/720', maxLimit: 10 },
  { id: 4, name: "pierogi", cuisine: "Polish", type: "main course", category: "vegetarian", ingridients: "nuts tofu  rice", ordersLimit: 10, price: 20, caption: "Palak paneer is a classic curry dish from North Indian cuisine made with fresh spinach, onions, spices, paneer and herbs. 'Palak' is a Hindi word for 'Spinach' and 'Paneer' is 'Indian cottage cheese'", photo: 'https://picsum.photos/id/229/1280/720', maxLimit: 10 },
  { id: 5, name: "curry", cuisine: "French", type: "side", category: "regular (with meat)", ingridients: "nuts tofu  rice", ordersLimit: 10, price: 220, caption: "Palak paneer is a classic curry dish from North Indian cuisine made with fresh spinach, onions, spices, paneer and herbs. 'Palak' is a Hindi word for 'Spinach' and 'Paneer' is 'Indian cottage cheese'", photo: 'https://picsum.photos/id/239/1280/720', maxLimit: 10 },
  { id: 6, name: "palak paneer", cuisine: "Indian", type: "main course", category: "vegan", ingridients: "nuts tofu  rice", ordersLimit: 10, price: 10, caption: "Palak paneer is a classic curry dish from North Indian cuisine made with fresh spinach, onions, spices, paneer and herbs. 'Palak' is a Hindi word for 'Spinach' and 'Paneer' is 'Indian cottage cheese'", photo: 'https://picsum.photos/id/137/1280/720', maxLimit: 10 },
  { id: 7, name: "pierogi", cuisine: "Polish", type: "main course", category: "vegetarian", ingridients: "nuts tofu  rice", ordersLimit: 10, price: 20, caption: "Palak paneer is a classic curry dish from North Indian cuisine made with fresh spinach, onions, spices, paneer and herbs. 'Palak' is a Hindi word for 'Spinach' and 'Paneer' is 'Indian cottage cheese'", photo: 'https://picsum.photos/id/238/1280/720', maxLimit: 10 },
  { id: 8, name: "curry", cuisine: "French", type: "side", category: "regular (with meat)", ingridients: "nuts tofu  rice", ordersLimit: 10, price: 10, caption: "Palak paneer is a classic curry dish from North Indian cuisine made with fresh spinach, onions, spices, paneer and herbs. 'Palak' is a Hindi word for 'Spinach' and 'Paneer' is 'Indian cottage cheese'", photo: 'https://picsum.photos/id/539/1280/720', maxLimit: 10 },
  { id: 9, name: "palak paneer", cuisine: "Indian", type: "main course", category: "vegan", ingridients: "nuts tofu  rice", ordersLimit: 10, price: 39.13, caption: "Palak paneer is a classic curry dish from North Indian cuisine made with fresh spinach, onions, spices, paneer and herbs. 'Palak' is a Hindi word for 'Spinach' and 'Paneer' is 'Indian cottage cheese'", photo: 'https://picsum.photos/id/437/1280/720', maxLimit: 10 },
  { id: 10, name: "pierogi", cuisine: "Polish", type: "main course", category: "vegetarian", ingridients: "nuts tofu  rice", ordersLimit: 10, price: 20, caption: "Palak paneer is a classic curry dish from North Indian cuisine made with fresh spinach, onions, spices, paneer and herbs. 'Palak' is a Hindi word for 'Spinach' and 'Paneer' is 'Indian cottage cheese'", photo: 'https://picsum.photos/id/838/1280/720', maxLimit: 10 },
  { id: 11, name: "curry", cuisine: "French", type: "side", category: "regular (with meat)", ingridients: "nuts tofu  rice", ordersLimit: 10, price: 20, caption: "Palak paneer is a classic curry dish from North Indian cuisine made with fresh spinach, onions, spices, paneer and herbs. 'Palak' is a Hindi word for 'Spinach' and 'Paneer' is 'Indian cottage cheese'", photo: 'https://picsum.photos/id/39/1280/720', maxLimit: 10 }
  ];
  getDishes() {
    return this.dishes;
  }
  getDish(id: number) {
    let selectedDish = this.dishes[0];
    this.dishes.forEach(dish => {
      if (dish.id == id) {
        selectedDish = dish;
      }
    });
    return selectedDish;
  }
}
