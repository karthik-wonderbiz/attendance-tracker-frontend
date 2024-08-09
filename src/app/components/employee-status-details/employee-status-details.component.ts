import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';

@Component({
  selector: 'app-employee-status-details',
  templateUrl: './employee-status-details.component.html',
  styleUrls: ['./employee-status-details.component.css']
})

export class EmployeeStatusDetailsComponent implements OnInit {
  @Input() employeeData: any[] = [];
  @Output() rowClicked = new EventEmitter<any>();

  columns = [
    { key: 'name', label: 'Employee Name' },
    { key: 'status', label: 'Status' },
    { key: 'inTime', label: 'In time' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {

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
      this.router.navigate(['/employee-detail', employee.id]);
    } else {
      console.error('Employee ID is missing or data is incorrect');
    }
  }
}
