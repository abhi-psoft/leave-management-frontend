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
  employees!: Employee[] ;
  leavesNum: any = (this.usedLeaves/this.totalLeaves)*100;
  breakpoint!: number;
  leaveRequests: number = 9;
  currentUserRole!: string;
  
  constructor(
    public headerService: HeaderService,
    private routerlink: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 1000) ? 2 : 5;
    this.headerService.showHeader();
    this.getEmployees();
    this.currentUserRole = localStorage.getItem('role')!;
  }

  onResize(event: any) {
    console.log("window change ", event.target.innerWidth)
    this.breakpoint = (event.target.innerWidth <= 1000) ? 2 : 5;
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
      return true
    } else {
      return false
    }
  }
}
