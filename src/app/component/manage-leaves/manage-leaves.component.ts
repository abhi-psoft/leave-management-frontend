import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LeaveSubmitDialogComponent } from 'src/app/dialogs/leave-submit-dialog/leave-submit-dialog.component';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-manage-leaves',
  templateUrl: './manage-leaves.component.html',
  styleUrls: ['./manage-leaves.component.scss'],
})
export class ManageLeavesComponent implements OnInit {
  leaveEmpData!: any[];

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllLeaveEmployeeDetails();
  }

  getAllLeaveEmployeeDetails() {
    this.employeeService.getLeavesEmployeeDetails().subscribe((data: any[]) => {
      console.log('The DATA: ', data);
      this.leaveEmpData = data;
    });
  }

  approveLeave(leave: any) {
    console.log(leave)
    const dialogRef = this.dialog.open(LeaveSubmitDialogComponent, {
      data: leave,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed ', result);
      if (result) {
        console.log('True returned');
        console.log('Approved', leave.id);
        this.employeeService.approveLeave(leave.id).subscribe((data: any) => {
          console.log(data);
        });
        this.toastr.success(
          'Leave Approoved For ' + leave.full_name,
          'Success!'
        );
      }
    });
  }

  rejectLeave(idLeave: string) {
    var result = confirm('Want to Reject the Leave application?');
    if (result) {
      console.log('Rejected!', idLeave);
      this.employeeService.rejectLeave(idLeave).subscribe((data: any)=>{
        console.log(data);
      });
    } else {
      console.log('Not Rejected!');
    }
  }
}
