import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  public getDishes(): Dish[] {
    return DISHES;
  }

  public getDish(id: string): Dish {
    return DISHES.filter((dish) => dish.id === id)[0];
  }
  
  public getFeaturedDish(): Dish {
    return DISHES.filter((dish) => dish.featured)[0]
  }
  
}
