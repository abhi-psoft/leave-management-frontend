import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  employees: Employee[] = [];
  name: any;
  test:boolean=false;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.getEmployees();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getEmployees();
    }, 3000);
  }

  private getEmployees() {
    this.employeeService.getAllEmployee().subscribe((data) => {
      this.employees = data;
      console.log(this.employees)
    });
  }

  updateEmployeePayrollById(id: number) {
    this.router.navigate(['update', id]);
    console.log(id);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployeePayroll(id).subscribe((data) => {
      console.log(data);
      this.getEmployees();
    });
  }

  onClick() {
    //this.employeeService.updateEmployee
    // console.log("Update successfully");
    //  window.alert("You just  Enter in Update Employee Form Successfully!");
  }

  onClickDelete(id: number) {
    var result = confirm('Want to delete the record?');
    if (result) {
      //Logic to delete the item
      this.employeeService.deleteEmployeePayroll(id).subscribe();
      console.log('delete successfully');
      this.toastr.error('Leave Deleted!', 'Deleted!');

      window.location.reload();
    } else {
      console.log('Not Delete');
    }
    // window.location.reload();
  }

  navigateToAddLeave(){
    this.router.navigate(['/add']);
  }

  isDateGreater(startdate: Date, currentDate: Date) {

    if(startdate.getFullYear() > currentDate.getFullYear()){
      return true;
    }
    else if(startdate.getFullYear() === currentDate.getFullYear()){
      if(startdate.getMonth() > currentDate.getMonth()){
        return true;
      }
      else if(startdate.getMonth() === currentDate.getMonth()){
        if(startdate.getDate() > currentDate.getDate()){
          return true;
        }
        else{
          return false;
        }
      }
      else{
        return false
      }
    }
    else{
      return false;
    }
  }

}
