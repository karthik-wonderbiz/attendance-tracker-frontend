import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { EmployeeInfoModel } from '../../model/EmployeeInfo.model';
import { ConcatName } from '../../utils/genericFunction'; // Import the Utils class

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://192.168.29.46:5000/api/employeedetail';

  constructor(private http: HttpClient) { }

  // Existing method to get all employee info
  getAllEmployeeInfo(): Observable<EmployeeInfoModel[]> {
    return this.http.get<EmployeeInfoModel[]>(this.baseUrl).pipe(
      map(employees => 
        employees.map(employee => ({
          ...employee,
          fullName: ConcatName.concatName(employee.firstName, employee.lastName)
        }))
      ),
      catchError(error => {
        console.error('Error fetching all employee info', error);
        return of([]);
      })
    );
  }

  getEmployeeByUserId(id: string): Observable<EmployeeInfoModel | null> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<EmployeeInfoModel>(url).pipe(
      map(employee => ({
        ...employee,
        fullName: ConcatName.concatName(employee.firstName, employee.lastName)
      })),
      catchError(error => {
        console.error(`Error fetching employee with ID ${id}`, error);
        return of(null);
      })
    );
  }
}
