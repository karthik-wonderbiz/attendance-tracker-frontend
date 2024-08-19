import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttendanceLogModel } from '../../../../model/AttendanceLog.model';
import { AttendanceLogService } from '../../../../services/attendanceLog/attendance-log.service';
import { SignalRService } from '../../../../services/signalR/signal-r.service'; // Import SignalR service
import { ngxCsv } from 'ngx-csv';
import { EncryptDescrypt, TimeFormatter } from '../../../../utils/genericFunction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-log-records',
  templateUrl: './employee-log-records.component.html',
  styleUrls: ['./employee-log-records.component.css'] // Fix styleUrls property name
})
export class EmployeeLogRecordsComponent implements OnInit {
  @Input() employeeLogData: any[] = [];
  @Output() rowClicked = new EventEmitter<any>();

  // Search related properties
  allLogRecords: any[] = [];
  allSuggestions: string[] = [];
  filteredSuggestions: string[] = [];
  searchTerms: string[] = [];
  searchInput: string = '';

  columns = [
    { key: 'fullName', label: 'Employee Name' },
    { key: 'attendanceDate', label: 'Attendance Date' },
    { key: 'attendanceTime', label: 'Attendance Time' },
    { key: 'checkType', label: 'Check Type' }
  ];

  constructor(
    private attendanceLogService: AttendanceLogService,
    private signalRService: SignalRService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscribeToItemUpdates();
    this.getAllAttendanceLogs();
  }

  private subscribeToItemUpdates(): void {
    this.signalRService.itemUpdate$.subscribe(update => {
      console.log('Item update received:', update);
      if (update) {
        this.getAllAttendanceLogs();
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
      this.allLogRecords = data.reverse().map(log => {
        const dateTime = new Date(log.attendanceLogTime);
        return {
          ...log,
          attendanceDate: dateTime.toLocaleDateString(),
          attendanceTime: TimeFormatter.formatTime(dateTime)
        };
      });
      const uniqueNames = new Set(this.allLogRecords.map(log => log.fullName));
      this.allSuggestions = Array.from(uniqueNames);
      
      this.performSearch();
      console.log('Sorted and Transformed Data:', this.employeeLogData);
    });
  }
  

  onRowClicked(employee: any) {
    if (employee && employee.userId) {
      console.log(employee.userId);
      const encryptedId = EncryptDescrypt.encrypt(employee.userId.toString());
      this.router.navigate(['/admin/employee-detail', encryptedId]);
    } else {
      console.error('Employee ID is missing or data is incorrect');
    }
  }

  // Search related methods
  onInputChange() {
    this.filteredSuggestions = this.allSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(this.searchInput.toLowerCase())
    );
  }

  addTerm() {
    const trimmedInput = this.searchInput.trim();
    if (
      trimmedInput &&
      this.allSuggestions.includes(trimmedInput) &&
      !this.searchTerms.includes(trimmedInput)
    ) {
      this.searchTerms.push(trimmedInput);
      this.searchInput = ''; // Clear the input box
      this.filteredSuggestions = []; // Clear suggestions
      this.performSearch(); // Filter logs based on the updated search terms
    }
  }

  removeTerm(term: string) {
    this.searchTerms = this.searchTerms.filter((t) => t !== term);
    this.performSearch(); // Filter logs based on the updated search terms
  }

  selectSuggestion(suggestion: string) {
    this.searchInput = suggestion;
    this.addTerm();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.filteredSuggestions.length > 0) {
      this.selectSuggestion(this.filteredSuggestions[0]);
      event.preventDefault();
    }
  }

  performSearch() {
    if (this.searchTerms.length === 0) {
      this.employeeLogData = this.allLogRecords; // Show all logs if no search terms
    } else {
      const query = this.searchTerms.join(' ').toLowerCase();
      this.employeeLogData = this.allLogRecords.filter((log) =>
        this.searchTerms.some((term) =>
          log.fullName.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
    console.log('Filtered logs:', this.employeeLogData);
  }
}
