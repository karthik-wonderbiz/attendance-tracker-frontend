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

  getEmployeeData(): Observable<any[]> {
    return this.http.get<EmployeeData>(this.dataUrl).pipe(
      map(data => {
        return data.EmployeeBasicInfo.map(employee => {
          const attendance = data.EmployeeAttendance.find(a => a.Employee === employee.Employee);
          return {
            name: employee.Name,
            status: attendance ? 'Present' : 'Absent',
            inTime: attendance ? attendance.FirstIn : '-'
          };
        });
      }),
      catchError(error => {
        console.error('Error fetching employee data', error);
        return of([]);
      })
    );
  }

  getTop5Employees(): Observable<{ max: any[], min: any[] }> {
    return this.http.get<EmployeeData>(this.dataUrl).pipe(
      map(data => {
        const attendanceData = data.EmployeeAttendance.map(attendance => {
          const employee = data.EmployeeBasicInfo.find(emp => emp.Employee === attendance.Employee);
          return {
            name: employee?.Name || 'Unknown',
            image: employee?.Image || '',
            dailyHours: this.convertToMinutes(attendance.DailyHours),
            weeklyHours: this.convertToMinutes(attendance.WeeklyHours),
            monthlyHours: this.convertToMinutes(attendance.MonthlyHours),
            quarterlyHours: this.convertToMinutes(attendance.QuarterlyHours),
            yearlyHours: this.convertToMinutes(attendance.YearlyHours),
            allTimeHours: this.convertToMinutes(attendance.AllTimeHours),
          };
        });
  
        const sortedData = attendanceData.sort((a, b) => b.dailyHours - a.dailyHours);
  
        const max = sortedData.slice(0, 5);
        const min = sortedData.slice(-5).reverse();
  
        return { max, min };
      }),
      catchError(error => {
        console.error('Error fetching top employees', error);
        return of({ max: [], min: [] });
      })
    );
  }

  getAllEmployees(): Observable<any[]> {
    return this.http.get<EmployeeData>(this.dataUrl).pipe(
      map(data => {
        const attendanceData = data.EmployeeAttendance.map(attendance => {
          const employee = data.EmployeeBasicInfo.find(emp => emp.Employee === attendance.Employee);
          return {
            name: employee?.Name || 'Unknown',
            image: employee?.Image || '',
            dailyHours: this.convertToMinutes(attendance.DailyHours),
            weeklyHours: this.convertToMinutes(attendance.WeeklyHours),
            monthlyHours: this.convertToMinutes(attendance.MonthlyHours),
            quarterlyHours: this.convertToMinutes(attendance.QuarterlyHours),
            yearlyHours: this.convertToMinutes(attendance.YearlyHours),
            allTimeHours: this.convertToMinutes(attendance.AllTimeHours),
          };
        });

        return attendanceData;
      }),
      catchError(error => {
        console.error('Error fetching all employees', error);
        return of([]);
      })
    );
  }
  
  private convertToMinutes(hours: string): number {
    const [hrs, mins] = hours.split(':').map(Number);
    return (hrs || 0) * 60 + (mins || 0);
  }  
}
