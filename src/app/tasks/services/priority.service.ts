import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Priority } from 'src/app/models/api-models/priority.model';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  private baseApiUrl = "https://localhost:44348";

  constructor(private httpClient:HttpClient) { }

  getPriorityList(): Observable<Priority[]>{
    return this.httpClient.get<Priority[]>(this.baseApiUrl+'/priorities');
  }
}
