import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/header/header.service';
import { Leave } from 'src/app/model/leave';
import { leaves } from 'src/app/model/constants/data-constants';
import { EmployeeService } from 'src/app/service/employee.service';
import { Employee } from 'src/app/model/employee';
import { UserService } from 'src/app/service/user.service';
import { ResponseEntity } from 'src/app/model/response';
import { LeaveData } from 'src/app/model/leave-data';
import { SharedHeaderService } from '../header/shared-header.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public totalLeaves: number = 20;
  public usedLeaves!: number;
  public remained!: number ;
  leaves: Leave[] = leaves;
  currentDate: Date = new Date();
  username: string = '';
  employees!: Employee[] ;
  leavesNum: any = 0;
  breakpoint!: number;
  leaveRequests: number = 9;
  currentUserRole!: string;
  user!: any;
  allUsers!: any[];
  designation!:string;
  doj!:string;
  leaveData: LeaveData[] = [];
  allLeavesData!: any[];
  request_count!: number;
  constructor(
    public headerService: HeaderService,
    private routerlink: Router,
    private employeeService: EmployeeService,
    private userService: UserService,
    private sharedHeaderService: SharedHeaderService
  ) {}

  ngOnInit(): void {
    this.sharedHeaderService.roleSubject.next(localStorage.getItem('role')!);
    this.userService.getUserById(localStorage.getItem('email')!).subscribe((data: any)=>{
      console.log("user is: ", data);
      this.user = data;
      this.currentUserRole = data.role;
      this.username = data.full_name;
      this.totalLeaves = data.leaves_allowed;
      this.usedLeaves = data.leaves_taken;
      this.remained = this.totalLeaves - this.usedLeaves;
      this.leavesNum = (this.usedLeaves/this.totalLeaves)*100;
      this.doj = data.doj;
      this.designation = data.designation;
      //Set HEADER DATA
      this.sharedHeaderService.userSubject.next(data);
    })
    console.log("Role is",this.currentUserRole, localStorage.getItem('email'));
    this.breakpoint = (window.innerWidth <= 1000) ? 2 : 5;
    this.headerService.showHeader();
    this.getAllLeaves();
    this.getLeavesByEmployee();
    this.getAllUsers();
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

  isDateGreater(startdateString: string, currentDate: Date) {
    let startdate = new Date(startdateString);
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

  getAllLeaves(){
    this.employeeService.getLeavesEmployeeDetails().subscribe((data: any[]) => {
      this.allLeavesData = data;
      console.log("Length: ",data.length);
      let filtered = data.filter(obj => obj.status === "Pending");
      console.log("Length2: ",filtered.length);
      this.request_count = filtered.length;
    });
  }

  getLeavesByEmployee(){
    this.employeeService.getLeavesByEmployee(localStorage.getItem('email')!).subscribe((data: any[])=>{
      this.leaveData = data;
      console.log("Leaves for current",this.leaveData);
    });
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((data: any[])=>{
      this.allUsers = data;
      console.log("all users: ",this.allUsers)
    });
  }
}
