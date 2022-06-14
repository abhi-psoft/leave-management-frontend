import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AutoScrollService, ColDef } from 'ag-grid-community';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { EmployeeService } from 'src/app/service/employee.service';
import { UserService } from 'src/app/service/user.service';
import { CurrentYearLeaves } from 'src/app/model/currentYearLeaves';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  leaveEmpData!: any[];
  displayedColumns: string[] = [
    'employee_id',
    'full_name',
    'designation',
    'leave_start_date',
    'leave_end_date',
    'reason',
    'type',
    'status',
  ];
  @ViewChild('content', { static: false }) element!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  filter: any = null;
  startDate!: string;
  endDate!: string;
  dataSource = new MatTableDataSource(this.leaveEmpData);
  searchText: any;
  showByDate: boolean = false;
  allUsers!: any[];
  usersCurrentYearLeaves: CurrentYearLeaves[] = [];
  public currentYear = new Date().getFullYear();
  constructor(
    private employeeService: EmployeeService,
    private _liveAnnouncer: LiveAnnouncer,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAllLeaveEmployeeDetails();
    this.dataSource.sort = this.sort;
    console.log(this.filter);
  }

  getAllLeaveEmployeeDetails() {
    this.employeeService.getLeavesEmployeeDetails().subscribe((data: any[]) => {
      console.log('The DATA: ', data);
      this.leaveEmpData = data;
      this.getAllUsers();
    });
  }

  savePdf() {
    let pdf = new jsPDF({
      orientation: 'p',
      unit: 'pt',

      format: [1420, 1720],
    });
    pdf.html(this.element.nativeElement, {
      margin: [40, 60, 40, 60],
      html2canvas: {
        // insert html2canvas options here, e.g.
        // width:5000,
      },
      callback: (pdf) => {
        pdf.save('all_reports.pdf');
      },
    });
  }

  saveExcel(): void {
    /* pass here the table id */
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.element.nativeElement
    );

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'report.xlsx');
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  radioChange() {
    console.log(this.filter);
  }

  resetFilter() {
    this.filter = null;
    this.showByDate = false;
  }

  isInRange(start_date: string, range: number): boolean {
    let date = new Date();
    let startDate = new Date(start_date);
    for (let i = 1; i < range; i++) {
      date.setDate(date.getDate() - 1);
      if (
        startDate.getDate() === date.getDate() &&
        startDate.getMonth() === date.getMonth() &&
        startDate.getFullYear() === date.getFullYear()
      ) {
        return true;
      }
    }

    return false;
  }

  dateChange() {
    this.showByDate = true;
    console.log(this.startDate, this.endDate);
  }

  isDateBetween(leaveDate: string): boolean {
    let leaveStartDate = new Date(leaveDate);
    let startDate = new Date(this.startDate);
    let endDate = new Date(this.endDate);
    if (leaveStartDate > startDate && leaveStartDate < endDate) {
      this.showByDate = true;
      return true;
    } else {
      return false;
    }
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((data: any[]) => {
      this.allUsers = data;
      console.log('all users: ', this.allUsers);

      this.countCurrentYearLeaves();
      console.log('countCurrentYearLeaves', this.usersCurrentYearLeaves);
    });
  }

  countCurrentYearLeaves() {
    this.allUsers.forEach((user) => {
       {
        let leaveCounter = 0;
        let userCurrent: CurrentYearLeaves = {
          employee_id: '',
          full_name: '',
          leaves_allowed: 0,
          leaves_taken_current: 0,
        };
        this.leaveEmpData.forEach((leave) => {
          if (user.employee_id === leave.employee_id) {
            userCurrent.employee_id = user.employee_id;
            userCurrent.full_name = user.full_name;
            userCurrent.leaves_allowed = user.leaves_allowed;
            let date = new Date(leave.leave_start_date);
            let year = date.getFullYear();
            if (year === this.currentYear) {
              leaveCounter++;
              console.log('UserLeave: ', user, leave);
            }
          }
          else{
            userCurrent.employee_id = user.employee_id;
            userCurrent.full_name = user.full_name;
            userCurrent.leaves_allowed = user.leaves_allowed;
          }
          userCurrent.leaves_taken_current = leaveCounter;
        });
        this.usersCurrentYearLeaves.push(userCurrent);
      }
    });
  }

  selectedYear(){
    console.log("hello")
    this.countCurrentYearLeaves();
  }
}
