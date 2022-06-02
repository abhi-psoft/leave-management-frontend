import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public visible: boolean = false;
  constructor() { }

  public hideHeader(){
    this.visible = false;
  }

  public showHeader(){
    this.visible = true;
  }

  public toggleHeader(){
    this.visible = !this.visible;
  }
}
