import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptDescrypt } from '../../../../utils/genericFunction';
import { EmployeeService } from '../../../../services/employee/employee.service';
import { AttendanceLogService } from '../../../../services/attendanceLog/attendance-log.service';

@Component({
  selector: 'app-employee-attendance-records',
  templateUrl: './employee-attendance-records.component.html',
  styleUrls: ['./employee-attendance-records.component.css'] // Changed styleUrl to styleUrls
})
export class EmployeeAttendanceRecordsComponent implements OnInit {
  @Output() rowClicked = new EventEmitter<any>();
  employees: any[] = [];
  allSuggestions: string[] = [];
  filteredSuggestions: string[] = [];
  searchTerms: string[] = [];
  searchInput: string = '';

  columns = [
    { key: 'fullName', label: 'Name' },
    { key: 'lastCheckInTime', label: 'In Time' },
    { key: 'lastCheckOutTime', label: 'Out Time' },
    { key: 'totalHours', label: 'Total Hours' }
  ];

  startDate: Date = new Date();
  endDate: Date = new Date();
  formattedStartDate = this.startDate.toLocaleDateString();
  formattedEndDate = this.startDate.toLocaleDateString();

  constructor(private router: Router, private attendanceLogService: AttendanceLogService) {}

  ngOnInit(): void {
    this.attendanceLogService.getAllEmployeesHours(this.formattedStartDate, this.formattedEndDate).subscribe(data => {
      this.employees = data;
      this.allSuggestions = this.employees.map(employee => employee.fullName);
      console.log('Employee Data:', this.employees);
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

  onInputChange() {
    this.filteredSuggestions = this.allSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(this.searchInput.toLowerCase())
    );
  }

  addTerm() {
    const trimmedInput = this.searchInput.trim();
    if (trimmedInput && this.allSuggestions.includes(trimmedInput) && !this.searchTerms.includes(trimmedInput)) {
      this.searchTerms.push(trimmedInput);
      this.searchInput = ''; // Clear the input box
      this.filteredSuggestions = []; // Clear suggestions
      this.performSearch();
    }
  }

  removeTerm(term: string) {
    this.searchTerms = this.searchTerms.filter(t => t !== term);
    this.performSearch();
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
    const query = this.searchTerms.join(' ');
    console.log('Searching for:', query);
  }
}
