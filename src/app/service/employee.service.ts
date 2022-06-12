import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  private baseURL =  'http://localhost:9091/leave-management-system';
  // private createURL = 'http://localhost:8080/employee-payroll-app/create';http://localhost:9090/lms/employees
  // private getURL =    'http://localhost:8080/employee-payroll-app/get/5';
  // private updateURL = 'http://localhost:8080/employee-payroll-app/update/{id}';
  // private deleteURL = 'http://localhost:8080/employee-payroll-app/delete/\';

  constructor(private httpClient: HttpClient) { }

  getAllEmployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}/get-all-employee`);
  }
 
  addEmployeeLeaveData (employee: Employee, email_id: string): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/create/${email_id}`, employee);
  }

  getEmployeePayrollDataById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}/get/${id}`);
  }

  updateEmployeePayrollById(id: number, employee: Employee): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/update/${id}`, employee);
  }

  deleteEmployeePayroll(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }

  send(employee: Employee): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/send-mail`, employee);
  }

  getLeavesByEmployee(mail: string): Observable<any>{
    return this.httpClient.get(`${this.baseURL}/get-employee-leaves/${mail}`);
  }

  getLeavesEmployeeDetails():Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL}/get-all-leaves-employee`);
  }

  approveLeave(idLeave: string):Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}/approve-leave/${idLeave}`);
  }

  rejectLeave(idLeave: string):Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}/reject-leave/${idLeave}`);
  }


}
