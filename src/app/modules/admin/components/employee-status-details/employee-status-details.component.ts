import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { EncryptDescrypt } from '../../../../utils/genericFunction';
import { AttendanceLogService } from '../../../../services/attendanceLog/attendance-log.service';
import { SignalRService } from '../../../../services/signalR/signal-r.service';

@Component({
  selector: 'app-employee-status-details',
  templateUrl: './employee-status-details.component.html',
  styleUrls: ['./employee-status-details.component.css']
})
export class EmployeeStatusDetailsComponent implements OnInit {
  @Input() employeeData: any[] = [];
  @Output() rowClicked = new EventEmitter<any>();

  columns = [
    { key: 'fullName', label: 'Employee Name' },
    { key: 'status', label: 'Status' },
    { key: 'inTime', label: 'In time' }
  ];

  constructor(private router: Router, private attendanceLogService: AttendanceLogService, private signalRService: SignalRService) {}

  ngOnInit() {
    this.subscribeToItemUpdates();
    this.getAllEmployeesLogsStatus();
  }

  private subscribeToItemUpdates(): void {
    this.signalRService.itemUpdate$.subscribe(update => {
      console.log('Item update received:', update);
      if (update) {
        this.getAllEmployeesLogsStatus();
      }
    });
  }

  getAllEmployeesLogsStatus(){
    this.attendanceLogService.getTodayAttendanceLogStatus().subscribe(data => {
      this.employeeData = data;
      console.log("Employee Today's Entries: ", this.employeeData);
    });
  }

  exportToCSV() {
    const options = {
      filename: 'employee-status-details',
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

    new ngxCsv(this.employeeData, options.filename, options);
  }

  onRowClicked(employee: any) {
    if (employee && employee.id) {
      // const empId = "1";

      const encryptedId = EncryptDescrypt.encrypt(employee.id.toString());
      this.router.navigate(['/admin/employee-detail', encryptedId]);
    } else {
      console.error('Employee ID is missing or data is incorrect');
    }
  }
}

