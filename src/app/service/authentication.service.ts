import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLoggedIn: boolean = false;

  constructor() { }

  public loggedIn(){
    this.isLoggedIn = true;
  }

  public loggedOut(){
    this.isLoggedIn = false;
  }
}
