import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { EmployeeBasicInfo } from '../model/employee-basic-info.model';
import { EmployeeAttendance } from '../model/employee-attendance.model';
import { EmployeeTimingDetails } from '../model/employee-timing-details.model';

interface EmployeeData {
  EmployeeBasicInfo: EmployeeBasicInfo[];
  EmployeeAttendance: EmployeeAttendance[];
  EmployeeTimingDetails: EmployeeTimingDetails[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = 'assets/data/employeeData.json';

  constructor(private http: HttpClient) {}

  getEmployeeBasicInfo(): Observable<EmployeeBasicInfo[]> {
    return this.http.get<EmployeeData>(this.dataUrl).pipe(
      map(data => data.EmployeeBasicInfo),
      catchError(error => {
        console.error('Error fetching employee basic info', error);
        return of([]);
      })
    );
  }

  getEmployeeAttendance(): Observable<EmployeeAttendance[]> {
    return this.http.get<EmployeeData>(this.dataUrl).pipe(
      map(data => data.EmployeeAttendance),
      catchError(error => {
        console.error('Error fetching employee attendance', error);
        return of([]);
      })
    );
  }

  getEmployeeTimingDetails(): Observable<EmployeeTimingDetails[]> {
    return this.http.get<EmployeeData>(this.dataUrl).pipe(
      map(data => data.EmployeeTimingDetails),
      catchError(error => {
        console.error('Error fetching employee timing details', error);
        return of([]);
      })
    );
  }
}
