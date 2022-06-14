import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/header/header.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';
import { SharedHeaderService } from './shared-header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  userToken!: any;
  role!: string;
  user: any;
  constructor(private router: Router, 
    public headerService: HeaderService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private sharedHeaderService: SharedHeaderService) { }

  ngOnInit(): void {
    this.userToken = localStorage.getItem('token')
    this.sharedHeaderService.roleSubject.subscribe((data: any)=>{
      this.role = data;
      console.log(this.role);
    });
    this.sharedHeaderService.userSubject.subscribe((data: any)=>{
      this.user = data;
    });
  }


  logout(){
    localStorage.removeItem('token');
    localStorage.clear();
    this.headerService.hideHeader();
    this.authenticationService.loggedOut();
    this.router.navigate(['/login']);
  }

  navigateToDashboard(){
    this.router.navigate(['/dashboard']);
  }
}
