import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { AttendanceLogModel } from '../../model/AttendanceLog.model';
import { ActivityRecordModel } from '../../model/ActivityRecord.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceLogService {
  private url = "http://localhost:5147/api/attendanceLog/summary";
  private urlMain = "http://localhost:5147/api/attendanceLog";

  constructor(private http: HttpClient) 
  { }

  getSummaryAttendance(startDate: string, endDate: string): Observable<any> {
    const attUrl = `${this.url}?startDate=${startDate}&endDate=${endDate}`
    return this.http.get<AttendanceLogModel>(attUrl).pipe(
      map(data => data),
      catchError(error => {
        console.error('Error fetching summary', error);
        return of([]);
      })
    );
  }

  getActivityRecordsByUserId(userdId: string, startDate: string, endDate: string): Observable<ActivityRecordModel[]> {
    const attUrl = `${this.urlMain}/activity-record?userId=${userdId}&startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<ActivityRecordModel[]>(attUrl).pipe(
      catchError(error => {
        console.error('Error fetching activity records', error);
        return of([]);
      })
    );
  }
  

}
