import { Injectable, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(
    private http: HttpClient,
    @Inject('baseURL') private baseURL: string,
  ) { }

  public getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.baseURL}dishes`);
  }

  public getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(`${this.baseURL}dishes/${id}`);
  }
  
  public getFeaturedDish(): Observable<Dish> {
    const query = '?featured=true';
    return this.http.get<Dish[]>(`${this.baseURL}dishes${query}`)
    .pipe(map(dishes => dishes[0]));
  }
  
  public getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  }

}
