import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  showAll: boolean = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private attendanceLogService: AttendanceLogService, 
    private signalRService: SignalRService
  ) {}

  ngOnInit() {
    this.subscribeToItemUpdates();

    // Check route parameter to decide whether to show all records or not
    this.route.paramMap.subscribe(params => {
      this.showAll = params.get('showAll') === 'true';
      if (this.showAll) {
        this.getAllEmployeesLogsStatus();
      } else {
        // this.getTop5EmployeesLogsStatus();
        this.getAllEmployeesLogsStatus();
      }
    });
  }

  private subscribeToItemUpdates(): void {
    this.signalRService.itemUpdate$.subscribe(update => {
      console.log('Item update received:', update);
      if (update) {
        this.getAllEmployeesLogsStatus();
      }
    });
  }

  // getTop5EmployeesLogsStatus() {
  //   this.attendanceLogService.getTodayAttendanceLogStatus().subscribe(data => {
  //     this.employeeData = data.slice(0,5);
  //     console.log("Employee Today's Entries: ", this.employeeData);
  //   });
  // }

  getAllEmployeesLogsStatus() {
    this.attendanceLogService.getTodayAttendanceLogStatus().subscribe(data => {
      this.employeeData = data;
      console.log("All Employee Today's Entries: ", this.employeeData);
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
      console.log(employee.id);
      const encryptedId = EncryptDescrypt.encrypt(employee.id.toString());
      this.router.navigate(['/admin/employee-detail', encryptedId]);
    } else {
      console.error('Employee ID is missing or data is incorrect');
    }
  }

  // Navigate to show all records
  viewAllRecords() {
    this.router.navigate(['/admin/employee-status-details', { showAll: 'true' }]);
  }
}
