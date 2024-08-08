import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { AttendanceLogModel } from '../../model/AttendanceLog.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceLogService {
  private url = "http://localhost:5147/api/attendanceLog/summary";

  constructor(private http: HttpClient) 
  { }

  getSummaryAttendance(startDate: string, endDate: string): Observable<any> {
    const attUrl = `${this.url}?startDate=${startDate}&endDate=${endDate}`
    return this.http.get<AttendanceLogModel>(this.url).pipe(
      map(data => data),
      catchError(error => {
        console.error('Error fetching summary', error);
        return of([]);
      })
    );
  }

}
