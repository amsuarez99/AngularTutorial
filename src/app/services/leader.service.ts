import { Inject, Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(
    private http: HttpClient,
    private processHTTPMsg: ProcessHTTPMsgService,
    @Inject('baseURL') private baseURL: string,
  ) { }

  public getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(`${this.baseURL}leadership`)
    .pipe(catchError(this.processHTTPMsg.handleError));

  }

  public getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(`${this.baseURL}leadership/${id}`)
    .pipe(catchError(this.processHTTPMsg.handleError));

  }

  public getFeaturedLeader(): Observable<Leader> {
    const query = '?featured=true';
    return this.http.get<Leader[]>(`${this.baseURL}leadership${query}`)
    .pipe(map(leaders => leaders[0]))
    .pipe(catchError(this.processHTTPMsg.handleError));
  }

}
