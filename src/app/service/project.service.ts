import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseURL =  'http://localhost:9091';
  constructor(private httpClient: HttpClient) { }

  getProjects(): Observable<any>{
   return this.httpClient.get<any>(this.baseURL + '/projects');   
  }
}
