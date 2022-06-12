import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  id!: number;
  employee: Employee = new Employee();
  public employeeForm!: FormGroup;

  minDateToFinish = new Subject<string>();
  minDate: Date | undefined;

  dateChange(e: { value: { toString: () => string } }) {
    this.minDateToFinish.next(e.value.toString());
  }

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.minDateToFinish.subscribe((r) => {
      this.minDate = new Date(r);
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeePayrollDataById(this.id).subscribe(
      (data: any) => {
        this.employee = data.data;
        console.log('Data: ', data.data);
      },
      (error) => console.log(error)
    );

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
      leaveStartDate: this.employee.leave_start_date,
      leaveEndDate: this.employee.leave_end_date,
    });
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
    this.employeeService
      .updateEmployeePayrollById(this.id, this.employee)
      .subscribe(
        (data) => {
          this.goToEmployeeList();
        },
        (error) => console.log(error)
      );
    this.toastr.success('Leave Updated!', 'Success!');
    // window.alert("Employee Leave Detail is updated Successfully!");
    this.router.navigate(['/home']);
  }

  clearForm() {
    this.employeeForm.reset();
  }

  goToEmployeeList() {
    this.router.navigate(['/home']);
  }

  buttonClick() {
    console.log('button click');
    // this.snack.open('Form updated succesfully', 'Cancel');
  }
}
