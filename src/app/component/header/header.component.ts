import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
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
  elem!: any;
  isFullScreen! : boolean;
  constructor(private router: Router, 
    public headerService: HeaderService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private sharedHeaderService: SharedHeaderService,
    @Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {
    this.elem = document.documentElement;
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

  openFullscreen() {
    this.isFullScreen = true;
    if (this.elem.requestFullscreen()) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen()) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen()) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen()) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }
/* Close fullscreen */
  closeFullscreen() {
    this.isFullScreen = false;
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }
}
