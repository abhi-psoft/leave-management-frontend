import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignInModel } from '../../app/model/sign-in';
import { ProjectService } from '../service/project.service';
import { RoleService } from '../service/role.service';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public roles!: any[] ;
  userSignin: SignInModel = {
    employee_id: 'A234',
    full_name: '',
    email_id: '',
    phone_no: 0,
    password: '',
    leaves_taken: 0,
    role: 'Admin',
    designation: '',
    leaves_allowed: 0,
    doj: '',
    project_name: '',
  };
  public projects!: any[];
  constructor(
    private service: UserService,
    private routerlink: Router,
    private roleService: RoleService,
    private projectService: ProjectService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.getProjects();
  }

  onSubmit(form: any) {
    console.log(form);
    if (form.valid) {
      this.userSignin.employee_id = form.value.empid;
      this.userSignin.full_name = form.value.fullName;
      this.userSignin.email_id = form.value.emailId;
      this.userSignin.password = form.value.password;
      this.userSignin.phone_no = form.value.phoneNumber;
      this.userSignin.leaves_allowed = form.value.leaves;
      this.userSignin.leaves_taken = 0;
      this.userSignin.designation = form.value.designation;
      this.userSignin.doj = form.value.doj;

      console.log('Submit: ', this.userSignin);
      this.service.signInUser(this.userSignin).subscribe((n) => {
        console.log(n);
        this.routerlink.navigate(['/login']);
      });
    }
    else{
      this.toastr.error("Please Enter Required Details!")
    }
  }

  login() {
    this.routerlink.navigate(['/login']);
  }

  getRoles() {
    this.roleService.getRoles().subscribe((data: any[]) => {
      this.roles = data;
      console.log(this.roles);
    });
  }

  getProjects() {
    this.projectService.getProjects().subscribe((data: any[]) => {
      this.projects = data;
      console.log(this.projects);
    });
  }
}
