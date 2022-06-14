import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedHeaderService {

  roleSubject: Subject<any> = new Subject();
  userSubject: Subject<any> = new Subject();
  constructor() { }
}
