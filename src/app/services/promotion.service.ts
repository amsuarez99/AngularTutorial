import { Injectable, Inject } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
    private http: HttpClient,
    private processHTTPMsg: ProcessHTTPMsgService,
    @Inject('baseURL') private baseURL: string,
  ) { }
  
  public getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${this.baseURL}promotions`)
    .pipe(catchError(this.processHTTPMsg.handleError));
  }

  public getPromotion(id: String): Observable<Promotion> {
    return this.http.get<Promotion>(`${this.baseURL}promotions/${id}`)
    .pipe(catchError(this.processHTTPMsg.handleError));
  }
  
  public getFeaturedPromotion(): Observable<Promotion> {
    const query = '?featured=true';
    return this.http.get<Promotion[]>(`${this.baseURL}promotions${query}`)
    .pipe(map(promotions => promotions[0]))
    .pipe(catchError(this.processHTTPMsg.handleError));
  }

}
