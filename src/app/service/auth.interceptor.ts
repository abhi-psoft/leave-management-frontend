import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
   let newRequest = request;
   let token = localStorage.getItem("token");

   if (token!=null){
     newRequest = newRequest.clone({setHeaders:{Authorization:`Bearer ${token}`}})
   }
   
    return next.handle(newRequest);
  }
}
