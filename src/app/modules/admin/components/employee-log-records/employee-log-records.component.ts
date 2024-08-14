import { Component, Input, OnInit } from '@angular/core';
import { AttendanceLogModel } from '../../../../model/AttendanceLog.model';
import { AttendanceLogService } from '../../../../services/attendanceLog/attendance-log.service';
import { SignalRService } from '../../../../services/signalR/signal-r.service'; // Import SignalR service
import { ngxCsv } from 'ngx-csv';
import { TimeFormatter } from '../../../../utils/genericFunction';

@Component({
  selector: 'app-employee-log-records',
  templateUrl: './employee-log-records.component.html',
  styleUrls: ['./employee-log-records.component.css'] // Fix styleUrls property name
})
export class EmployeeLogRecordsComponent implements OnInit {
  @Input() employeeLogData: any[] = [];
  
  columns = [
    { key: 'userId', label: 'Employee Id' },
    { key: 'empName', label: 'Employee Name' },
    { key: 'attendanceDate', label: 'Attendance Date' },
    { key: 'attendanceTime', label: 'Attendance Time' },
    { key: 'checkType', label: 'Check Type' }
  ];

  constructor(
    private attendanceLogService: AttendanceLogService,
    private signalRService: SignalRService // Inject SignalR service
  ) {}

  ngOnInit(): void {
    this.getAllAttendanceLogs();
    this.signalRService.itemUpdate$.subscribe(update => {
      if (update) {
        const { userId, attendanceLogTime, checkType } = update;
        const dateTime = new Date(attendanceLogTime);

        // Correctly format date and time
        const formattedDate = dateTime.toLocaleDateString();
        const formattedTime = TimeFormatter.formatTime(dateTime);

        this.employeeLogData.unshift({
          userId,
          attendanceDate: formattedDate,
          attendanceTime: formattedTime,
          checkType
        });
        this.employeeLogData = [...this.employeeLogData]; // Trigger change detection
      }
    });
  }

  exportToCSV() {
    const options = {
      filename: 'employee-log-records-details',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      title: '',
      useBom: true,
      headers: this.columns.map(col => col.label),
      noDownload: false,
      removeEmptyValues: true
    };

    new ngxCsv(this.employeeLogData, options.filename, options);
  }

  attendanceLogModel: AttendanceLogModel = {
    userId: 0,
    inOutTime: '',
    checkType: '',
    total: 0,
    present: 0,
    wfh: 0,
    absent: 0,
    startDate: '',
    endDate: '',
    attendanceLogTime: '',
    firstName: '',
    lastName: '',
    totalHours: '',
    profilePic: '',
    fullName: '',
    lastCheckInTime: '',
    lastCheckOutTime: '',
    status: '',
    inTime: ''
  }

  getAllAttendanceLogs() {
    this.attendanceLogService.getAllAttendanceLogs().subscribe((data) => {
      this.employeeLogData = data.reverse().map(log => {
        const dateTime = new Date(log.attendanceLogTime);
        
        // Correctly format date and time
        return {
          ...log,
          attendanceDate: dateTime.toLocaleDateString(),
          attendanceTime: TimeFormatter.formatTime(dateTime)
        };
      });
      console.log('Sorted and Transformed Data:', this.employeeLogData);
    });
  }
}
