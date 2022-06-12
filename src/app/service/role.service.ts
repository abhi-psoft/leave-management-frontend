import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseURL =  'http://localhost:9091';
  constructor(private httpClient: HttpClient) { }

  getRoles(){
   return this.httpClient.get<any>(this.baseURL + '/get-all-roles');   
  }
}
