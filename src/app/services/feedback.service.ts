import { Inject, Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private http: HttpClient,
    private processHTTPMsg: ProcessHTTPMsgService,
    @Inject('baseURL') private baseURL: string,
  ) { }

  public submitFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Feedback>(`${this.baseURL}feedback`, feedback, httpOptions)
    .pipe(catchError(this.processHTTPMsg.handleError));
  }
}
