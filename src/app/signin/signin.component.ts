import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInModel } from '../../app/model/sign-in'
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
 
 userSignin: SignInModel = {

    fullName: '',
    emailId: '',
    password: '',
    phoneNumber: 0

  } 
  constructor( private service: UserService,
    private routerlink: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(form: any){
    console.log(form)
    this.userSignin.fullName = form.value.fullName;
    this.userSignin.emailId = form.value.emailId;
    this.userSignin.password = form.value.password;
    this.userSignin.phoneNumber = form.value.phoneNumber;

    this.service.signInUser(this.userSignin).subscribe(n=>{
      console.log(n);
      this.routerlink.navigate(["/login"])
      
    })

  }

  login(){
    this.routerlink.navigate(['/login'])
  }

}

