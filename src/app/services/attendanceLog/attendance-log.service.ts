import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { AttendanceLogModel } from '../../model/AttendanceLog.model';
import { ActivityRecordModel } from '../../model/ActivityRecord.model';
import { ConcatName, TimeFormatter } from '../../utils/genericFunction';

@Injectable({
  providedIn: 'root'
})
export class AttendanceLogService {
  private urlMain = "http://192.168.29.46:5000/api/attendanceLog";

  constructor(private http: HttpClient) 
  { }

  getTodayAttendanceLogStatus(): Observable<AttendanceLogModel[]> {
    const statusUrl = `${this.urlMain}/status`;
    return this.http.get<AttendanceLogModel[]>(statusUrl).pipe(
      map(logs => 
        logs.map(log => ({
          ...log,
          fullName: ConcatName.concatName(log.firstName, log.lastName)
        }))
      ),
      catchError(error => {
        console.error('Error fetching today\'s attendance logs', error);
        return of([]);
      })
    );
  }

  getSummaryAttendance(startDate: string, endDate: string): Observable<any> {
    const attUrl = `${this.urlMain}/summary?startDate=${startDate}&endDate=${endDate}`
    return this.http.get<AttendanceLogModel>(attUrl).pipe(
      map(data => data),
      catchError(error => {
        console.error('Error fetching summary', error);
        return of([]);
      })
    );
  }

  getAllAttendanceLogs(): Observable<AttendanceLogModel[]> {
    return this.http.get<AttendanceLogModel[]>(this.urlMain).pipe(
      catchError(error => {
        console.error('Error fetching all attendance logs', error);
        return of([]);
      })
    );
  }
  
  getAllEmployeesHours(startDate: string, endDate: string): Observable<AttendanceLogModel[]> {
    const attUrl = `${this.urlMain}/totalhours?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<AttendanceLogModel[]>(attUrl).pipe(
      map(employees => 
        employees.map(employee => ({
          ...employee,
          fullName: ConcatName.concatName(employee.firstName, employee.lastName)
        }))
      ),
      catchError(error => {
        console.error('Error fetching all employee hours', error);
        return of([]);
      })
    );
  }
  
  getActivityRecordsInByUserId(userdId: string, startDate: string, endDate: string): Observable<ActivityRecordModel[]> {
    const attUrl = `${this.urlMain}/activity-record/in?userId=${userdId}&startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<ActivityRecordModel[]>(attUrl).pipe(
      catchError(error => {
        console.error('Error fetching in activity records', error);
        return of([]);
      })
    );
  }

  getActivityRecordsOutByUserId(userdId: string, startDate: string, endDate: string): Observable<ActivityRecordModel[]> {
    const attUrl = `${this.urlMain}/activity-record/out?userId=${userdId}&startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<ActivityRecordModel[]>(attUrl).pipe(
      catchError(error => {
        console.error('Error fetching out activity records', error);
        return of([]);
      })
    );
  }
}
