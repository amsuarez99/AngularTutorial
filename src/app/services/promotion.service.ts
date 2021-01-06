import { Injectable, Inject } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
    private http: HttpClient,
    @Inject('baseURL') private baseURL: string,
  ) { }
  
  public getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${this.baseURL}promotions`);
  }

  public getPromotion(id: String): Observable<Promotion> {
    return this.http.get<Promotion>(`${this.baseURL}promotions/${id}`);
  }
  
  public getFeaturedPromotion(): Observable<Promotion> {
    const query = '?featured=true';
    return this.http.get<Promotion[]>(`${this.baseURL}promotions${query}`)
        .pipe(map(promotions => promotions[0]));
  }

}
