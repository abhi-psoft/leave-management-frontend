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
import { el, tr } from 'date-fns/locale';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LeaveSubmitDialogComponent } from 'src/app/dialogs/leave-submit-dialog/leave-submit-dialog.component';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  public currentUserRole!: string;

  employee: Employee = new Employee();
  leaveTypes = ['Medical', 'Vacation', 'Business Tour', 'Other', 'Back Dated'];
  // testSubscription: Subscription;

  public employeeForm!: FormGroup;
  public currentUser!: any;
  public users!: any[];
  public disableSelect: boolean = true;
  minDateToFinish = new Subject<string>();

  public isHalfDay: boolean = false;
  public isBackDated: boolean = false;

  public maxDate: Date = new Date();
  public minDate: Date = new Date();
  selectedUserMailAddress: any;
  selectedUserName: any;

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
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    //  this.minDateToFinish.subscribe(r => {
    // this.minDate = new Date(r);
    // })
  }

  ngOnInit(): void {
    this.maxDate.setDate(this.maxDate.getDay() + 100);
    this.minDate.setDate(this.minDate.getDay() - 2);
    this.getUserById();
    this.getUserRole();
    this.getUsers();
    this.employeeForm = this.fb.group(
      {
        name: ['', Validators.required],
        leaveType: ['', Validators.required],
        leaveStartDate: ['', Validators.required],
        leaveEndDate: [''],
        notes: [''],
        emailAddress: [{ value: '', disabled: true }, Validators.required, Validators.email],
      },
      { validator: this.checkDates }
    );

    this.employeeForm.setValue({
      //  date: formatDate(new Date(), 'dd/mm/yyyy', 'en-US'),
      leaveStartDate: formatDate(
        this.employee.leave_start_date,
        'yyyy-MM-dd',
        'en-US'
      ),
      leaveEndDate: formatDate(
        this.employee.leave_end_date,
        'yyyy-MM-dd',
        'en-US'
      ),
    });
    if (this.currentUserRole == 'User') {
      // this.employee.full_name = 'current user';
      // this.employee.emailAddress = 'email';
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
    this.employee.applied_by  = this.currentUser.full_name;
    this.employee.paid_unpaid = "Paid";
    this.employee.status = "Pending";
    this.employee.type = (this.isHalfDay)?("Half Day"):("Full Day"); 

    if (this.employeeForm.valid) {
      const dialogRef = this.dialog.open(LeaveSubmitDialogComponent, {
  //      width: '600px',
        data: this.employee,
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed ', result);
        if (result) {
          console.log('True returned');
          this.saveEmployeeLeave();
          console.log("Leave Data: ",this.employee)
          this.toastr.success('Leave Added!', 'Success!');
        }
      });
    }
    else{
      this.toastr.error("Please Enter Required Details!")
    }

    //this.employeeService.getAllEmployee();
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

  saveEmployeeLeave() {
    // this.employee.department = this.selectedDepartment;
    console.log(this.selectedUserMailAddress)
    this.employeeService.addEmployeeLeaveData(this.employee, this.selectedUserMailAddress).subscribe(
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

  getUsers() {
    this.userService.getAllUsers().subscribe((data: any) => {
      console.log(data);
      this.users = data;
      console.log('Users data', this.users);
    });
  }

  getUserRole() {
    this.currentUserRole = localStorage.getItem('role')!;
    console.log(this.currentUserRole);
  }

  dateTest() {
    console.log('Startdate: ', this.employee.leave_start_date);
    console.log('Enddate: ', this.employee.leave_end_date);
  }

  getUserById() {
    let email = localStorage.getItem('email');
    console.log(email);
    this.userService.getUserById(email!).subscribe((data: any) => {
      console.log(data);
      this.currentUser = data;
      console.log('Current User', this.currentUser);
    });
  }

  setFormEmail(event: any) {
    let user = this.users.find((obj) => {
      return obj.full_name === event.value;
    });
    console.log('Selected ', user);
    this.selectedUserMailAddress = user!.emailId;
  }
}
