import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/header/header.service';
import { Leave } from 'src/app/model/leave';
import { leaves } from 'src/app/model/constants/data-constants';
import { EmployeeService } from 'src/app/service/employee.service';
import { Employee } from 'src/app/model/employee';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public totalLeaves: number = 20;
  public usedLeaves: number = 15;
  public remained: number = this.totalLeaves - this.usedLeaves;
  leaves: Leave[] = leaves;
  currentDate: Date = new Date();
  username: string = 'Abhishek Suryawanshi';
  employees!: Employee[];
  leavesNum: any = (this.usedLeaves/this.totalLeaves)*100;

  
  constructor(
    public headerService: HeaderService,
    private routerlink: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {

    this.headerService.showHeader();
    this.getEmployees();
  }

 

  navigateToAllLeaves() {
    this.routerlink.navigate(['/home']);
  }

  navigateToAddLeave() {
    this.routerlink.navigate(['/add']);
  }

  private getEmployees() {
    this.employeeService.getAllEmployee().subscribe((data) => {
      this.employees = data;
      console.log(this.employees)
    });
  }

  isDateGreater(startdate: Date, currentDate: Date) {
    if (startdate.getFullYear() > currentDate.getFullYear()) {
      return true;
    } else if (startdate.getFullYear() === currentDate.getFullYear()) {
      if (startdate.getMonth() > currentDate.getMonth()) {
        return true;
      } else if (startdate.getMonth() === currentDate.getMonth()) {
        if (startdate.getDate() > currentDate.getDate()) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isDateBetween(start: string, end: string): boolean {
    let startDate = new Date(start);
    let endDate = new Date(end);
    if (this.currentDate > startDate && this.currentDate < endDate) {
      console.log(' date is between the 2 dates');
      return true
    } else {
      console.log('date is not in the range');
      return false
    }
  }
}
