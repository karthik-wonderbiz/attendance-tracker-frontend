import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-attendance-records',
  templateUrl: './employee-attendance-records.component.html',
  styleUrl: './employee-attendance-records.component.css'
})
export class EmployeeAttendanceRecordsComponent implements OnInit {
  @Output() rowClicked = new EventEmitter<any>();
  employees: any[] = [];
  columns = [
    { key: 'name', label: 'Name' },
    { key: 'inTime', label: 'In Time' },
    { key: 'outTime', label: 'Out Time' },
    { key: 'dailyHours', label: 'Total Hours' }
  ];

  startDate: Date = new Date();
  formattedDate = this.startDate.toLocaleDateString();


  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
      this.dataService.getAllEmployees().subscribe(data =>{
        this.employees = data;
        console.log(this.employees);
      });
  }
  onRowClicked(employee: any) {
    if (employee && employee.id) {
      this.router.navigate(['/employee-detail', employee.id]);
    } else {
      console.error('Employee ID is missing or data is incorrect');
    }
  }

  searchInput: string = '';
  searchTerms: string[] = [];
  allSuggestions: string[] = ['Suggestion1', 'Suggestion2', 'Suggestion3', 'Suggestion4']; // Replace with actual suggestions
  filteredSuggestions: string[] = [];

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
      event.preventDefault(); // Prevent default Enter key behavior
    }
  }

  performSearch() {
    const query = this.searchTerms.join(' ');
    console.log('Searching for:', query);
    // Example: this.searchService.search(query).subscribe(results => this.results = results);
  }
}
