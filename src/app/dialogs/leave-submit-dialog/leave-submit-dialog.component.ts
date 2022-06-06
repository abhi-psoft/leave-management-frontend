import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Employee } from 'src/app/model/employee';
@Component({
  selector: 'app-leave-submit-dialog',
  templateUrl: './leave-submit-dialog.component.html',
  styleUrls: ['./leave-submit-dialog.component.scss']
})
export class LeaveSubmitDialogComponent {

  constructor(public dialogRef: MatDialogRef<LeaveSubmitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
