import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from 'src/app/models/api-models/status.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private baseApiUrl = "https://localhost:44348";

  constructor(private httpClient:HttpClient) { }

  getStatusList(): Observable<Status[]>{
    return this.httpClient.get<Status[]>(this.baseApiUrl+'/statuses');
  }
}
