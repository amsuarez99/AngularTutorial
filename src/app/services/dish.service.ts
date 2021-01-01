import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  public getDishes(): Promise<Dish[]> {
    return Promise.resolve(DISHES);
  }

  public getDish(id: string): Promise<Dish> {
    return Promise.resolve( DISHES.filter((dish) => dish.id === id)[0] );
  }
  
  public getFeaturedDish(): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  }
  
}
