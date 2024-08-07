import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ngxCsv } from 'ngx-csv';

@Component({
  selector: 'app-employee-status-details',
  templateUrl: './employee-status-details.component.html',
  styleUrls: ['./employee-status-details.component.css']
})
export class EmployeeStatusDetailsComponent implements OnInit {
  @Input() employeeData: any[] = [];
  
  columns = [
    { key: 'name', label: 'Employee Name' },
    { key: 'status', label: 'Status' },
    { key: 'inTime', label: 'In time' }
  ];

  ngOnInit() {}

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
}
