import { Injectable, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(
    private http: HttpClient,
    private processHTTPMsg: ProcessHTTPMsgService,
    @Inject('baseURL') private baseURL: string,
  ) { }

  public getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.baseURL}dishes`)
    .pipe(catchError(this.processHTTPMsg.handleError));
  }

  public getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(`${this.baseURL}dishes/${id}`)
    .pipe(catchError(this.processHTTPMsg.handleError));
  }

  public putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Dish>(`${this.baseURL}dishes/${dish.id}`, dish, httpOptions)
    .pipe(catchError(this.processHTTPMsg.handleError));
  }

  public getFeaturedDish(): Observable<Dish> {
    const query = '?featured=true';
    return this.http.get<Dish[]>(`${this.baseURL}dishes${query}`)
    .pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMsg.handleError));
  }

  public getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error => error));
  }

}
