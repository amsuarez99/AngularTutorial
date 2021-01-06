import { Inject, Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(
    private http: HttpClient,
    @Inject('baseURL') private baseURL: string,
  ) { }
  
  public getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(`${this.baseURL}leadership`);
  }

  public getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(`${this.baseURL}leadership/${id}`);
  }

  public getFeaturedLeader(): Observable<Leader> {
    const query = '?featured=true';
    return this.http.get<Leader[]>(`${this.baseURL}leadership${query}`)
    .pipe(map(leaders => leaders[0]));
  }

}
