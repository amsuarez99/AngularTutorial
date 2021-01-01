import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  public getDishes(): Promise<Dish[]> {
    return new Promise( resolve => {
      setTimeout(() => resolve(DISHES), 2000);
    });
  }

  public getDish(id: string): Promise<Dish> {
    return new Promise( resolve => {
      setTimeout(() => resolve( DISHES.filter((dish) => dish.id === id)[0] ), 2000);
    });
  }
  
  public getFeaturedDish(): Promise<Dish> {
    return new Promise( resolve => {
      setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    }); 
  }
  
}
