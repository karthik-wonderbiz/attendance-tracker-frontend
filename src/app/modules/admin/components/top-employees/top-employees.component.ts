import { Component, OnInit, ViewChild } from '@angular/core';
import { TableWithTabsComponent } from '../generic-components/table-with-tabs/table-with-tabs.component';
import { ngxCsv } from 'ngx-csv';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-top-employees',
  templateUrl: './top-employees.component.html',
  styleUrls: ['./top-employees.component.css']
})
export class TopEmployeesComponent implements OnInit {
  @ViewChild('maxHoursTable') maxHoursTable: TableWithTabsComponent | undefined;
  @ViewChild('minHoursTable') minHoursTable: TableWithTabsComponent | undefined;
  
  maxHoursData: any[] = [];
  minHoursData: any[] = [];
  allMaxHoursData: any[] = [];
  allMinHoursData: any[] = [];
  columns = [
    { key: 'fullName', label: 'Name' },
    { key: 'totalHours', label: 'Total Hours' }
  ];
  tabNames = ['All Time', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
  tabs = ['AllTime', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
  showMaxTop5 = true;
  showMinTop5 = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getTop5Employees().subscribe(data => {
      this.maxHoursData = data.max;
      this.minHoursData = data.min;
      this.allMaxHoursData = data.max;
      this.allMinHoursData = data.min;
    });

    this.dataService.getAllEmployees().subscribe(data => {
      const sortedData = data.sort((a, b) => b.dailyHours - a.dailyHours);
      this.allMaxHoursData = sortedData;
      this.allMinHoursData = sortedData.reverse();
    });
  }

  toggleMaxHoursView(): void {
    if (this.showMaxTop5) {
      this.dataService.getAllEmployees().subscribe(data => {
        this.allMaxHoursData = data.sort((a, b) => b.dailyHours - a.dailyHours);
        this.maxHoursData = this.allMaxHoursData;
      });
    } else {
      this.maxHoursData = this.allMaxHoursData.slice(0, 5);
    }
    this.showMaxTop5 = !this.showMaxTop5;
  }

  toggleMinHoursView(): void {
    if (this.showMinTop5) {
      this.dataService.getAllEmployees().subscribe(data => {
        this.allMinHoursData = data.sort((a, b) => b.dailyHours - a.dailyHours).reverse();
        this.minHoursData = this.allMinHoursData.slice(0, 5);
      });
    } else {
      this.minHoursData = this.allMinHoursData;
    }
    this.showMinTop5 = !this.showMinTop5;
  }

  exportMaxHoursToCSV(): void {
    const filteredData = this.maxHoursTable?.getFilteredData() || this.maxHoursData;
    const options = {
      filename: 'top-employees-max-hours',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      title: '',
      useBom: true,
      headers: this.columns.map(col => col.label),
      noDownload: false,
      removeEmptyValues: false
    };
    new ngxCsv(filteredData, options.filename, options);
  }

  exportMinHoursToCSV(): void {
    const filteredData = this.minHoursTable?.getFilteredData() || this.minHoursData;
    const options = {
      filename: 'top-employees-min-hours',
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
    new ngxCsv(filteredData, options.filename, options);
  }
}
