import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { ResponseEntity } from 'src/app/model/response';
import { User } from 'src/app/model/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tr } from 'date-fns/locale';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  public currentUserRole!: string;

  employee: Employee = new Employee(0, '', '', '', '', '', '', false);
  leaveTypes = ['Medical', 'Vacation', 'Business Tour', 'Other', 'Back Dated'];
  // testSubscription: Subscription;

  public employeeForm!: FormGroup;

  public users!: User[];
  public disableSelect: boolean = true;
  minDateToFinish = new Subject<string>();

  public isHalfDay: boolean = false;
  public isBackDated: boolean = false;

  public maxDate: Date = new Date();
  public minDate: Date = new Date();

  // dateChange(e: { value: { toString: () => string; }; }) {
  //   this.minDateToFinish.next(e.value.toString());
  // }

  constructor(
    //private snack: MatSnackBar,
    private fb: FormBuilder,
    private userService: UserService,
    private employeeService: EmployeeService,
    private router: Router,
    private location: Location,
    private toastr: ToastrService
  ) {
    //  this.minDateToFinish.subscribe(r => {
    // this.minDate = new Date(r);
    // })
  }

  ngOnInit(): void {
    this.maxDate.setDate(this.maxDate.getDay() + 100);
    this.minDate.setDate(this.minDate.getDay() - 2);

    this.getUserRole();
    this.getUsers();
    this.employeeForm = this.fb.group(
      {
        name: ['', Validators.required],
        leaveType: ['', Validators.required],
        leaveStartDate: ['', Validators.required],
        leaveEndDate: ['', Validators.required],
        notes: ['', Validators.required],
        emailAddress: ['', Validators.required],
      },
      { validator: this.checkDates }
    );

    this.employeeForm.setValue({
      //  date: formatDate(new Date(), 'dd/mm/yyyy', 'en-US'),
      leaveStartDate: formatDate(
        this.employee.leaveStartDate,
        'yyyy-MM-dd',
        'en-US'
      ),
      leaveEndDate: formatDate(
        this.employee.leaveEndDate,
        'yyyy-MM-dd',
        'en-US'
      ),
    });
    if (this.currentUserRole == 'User') {
      this.employee.name = 'current user';
      this.employee.emailAddress = 'email';
    }
  }

  setbackDated() {
    this.maxDate = new Date();
    this.minDate = new Date();
    this.maxDate.setDate(this.maxDate.getDay() - 3);
    this.minDate.setDate(this.minDate.getDay() - 100);
  }

  setFutureDated() {
    this.maxDate = new Date();
    this.minDate = new Date();
    this.maxDate.setDate(this.maxDate.getDay() + 100);
    this.minDate.setDate(this.minDate.getDay() - 2);
  }

  backDateToggle() {
    if (this.isBackDated === true) {
      this.setbackDated();
      console.log('Backdated', this.maxDate);
    } else {
      this.setFutureDated();
      console.log('Not Backdated');
    }
    console.log(this.isBackDated);
  }

  checkDates(group: FormGroup) {
    if (
      group.controls['leaveEndDate'].value <
      group.controls['leaveStartDate'].value
    ) {
      return { notValid: true };
    }
    return null;
  }

  onSubmit() {
    console.log(this.employee);
    console.log('Added Data');
    this.saveEmployee();

    //  window.alert("Employee Leave Details added Successfully!");
    this.toastr.success('Leave Added!', 'Success!');
    //  this.employeeService.getAllEmployee

    this.employeeService.getAllEmployee();
    // window.location.reload();

    // this.employeeForm.reset();
  }

  clearForm() {
    this.employeeForm.reset();
  }

  goBack() {
    //this.router.navigate(['/home']);
    this.location.back();
  }

  sendEmail() {
    this.employeeService.send(this.employee).subscribe(
      (data) => {
        console.log(data);
        this.goBack();
      },
      (error) => console.log(error)
    );
    this.goBack();
  }

  saveEmployee() {
    // this.employee.department = this.selectedDepartment;
    this.employeeService.addEmployeePayrollData(this.employee).subscribe(
      (data) => {
        console.log('Saved', data);
        window.location.reload();
        this.goBack();

        window.location.reload();
      },
      (error) => {
        console.log('Error', error);
      }
    );
    this.goBack();
  }

  buttonClick() {
    console.log('button click');
    // this.snack.open('Form submitted succesfully', 'Cancel');
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((data: ResponseEntity) => {
      console.log(data);
      this.users = data.data;
      console.log('Users data', this.users);
    });
  }

  getUserRole() {
    // const token = localStorage.getItem('token');
    // const obj = JSON.parse(atob(token!.split('.')[1]))

    // this.userService.getUserRole(obj.sub).subscribe((res: ResponseEntity)=>{
    //   console.log("Role is: ", res.data);
    //   localStorage.setItem('role', res.data)
    // })
    this.currentUserRole = localStorage.getItem('role')!;
    console.log(this.currentUserRole);
  }

  dateTest() {
    console.log('Startdate: ', this.employee.leaveStartDate);
    console.log('Enddate: ', this.employee.leaveEndDate);
  }
}
