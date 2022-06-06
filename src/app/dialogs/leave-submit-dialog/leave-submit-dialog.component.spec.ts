import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveSubmitDialogComponent } from './leave-submit-dialog.component';

describe('LeaveSubmitDialogComponent', () => {
  let component: LeaveSubmitDialogComponent;
  let fixture: ComponentFixture<LeaveSubmitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveSubmitDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveSubmitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
