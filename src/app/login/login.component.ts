import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ResponseEntity } from '../model/response';
import { AuthenticationService } from '../service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { SharedHeaderService } from '../component/header/shared-header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credential = {
    emailId: '',
    password: '',
  };

  wrongCredential: boolean = false;

  constructor(private userService: UserService, 
    private routerlink: Router, 
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private sharedHeaderService: SharedHeaderService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.credential);
    this.userService.generateToken(this.credential).subscribe(
      (response: any) => {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(response.token);
        localStorage.setItem('token', response.token);
        this.userService.loginUser(response.token);
        this.getUserRole();
        localStorage.setItem('email',this.credential.emailId);
        this.authenticationService.loggedIn();
        this.routerlink.navigate(['/dashboard']);
        this.toastr.success("Welcome!")
      },
      (error) => {
        this.wrongCredential = true;
      }
    );
  }

  signup(){
    this.routerlink.navigate(['/signup']);
  }

  getUserRole(){
    this.userService.getUserRole(this.credential.emailId).subscribe((res: ResponseEntity)=>{
      console.log("Role is: ", res.data);
      this.sharedHeaderService.roleSubject.next(res.data);
      localStorage.setItem('role', res.data)
      
    })
  }
}
