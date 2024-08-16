import { Component, OnInit, ViewChild } from '@angular/core';
import { TableWithTabsComponent } from '../generic-components/table-with-tabs/table-with-tabs.component';
import { DataService } from '../../../../services/data.service';
import { AttendanceLogService } from '../../../../services/attendanceLog/attendance-log.service';
import { SignalRService } from '../../../../services/signalR/signal-r.service';

@Component({
  selector: 'app-top-employees',
  templateUrl: './top-employees.component.html',
  styleUrls: ['./top-employees.component.css']
})
export class TopEmployeesComponent implements OnInit {
  @ViewChild('hoursTable') hoursTable: TableWithTabsComponent | undefined;

  top5Employee: any[] = [];
  allEmployeesData: any[] = [];
  columns = [
    { key: 'fullName', label: 'Employee Name' },
    { key: 'totalHours', label: 'Total Hours' }
  ];
  tabNames = ['All Time', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
  tabs = ['All-Time', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];

  constructor(
    private dataService: DataService,
    private attendanceLogService: AttendanceLogService,
    private signalRService: SignalRService
  ) {}

  ngOnInit(): void {
    const startDate = '';
    const endDate = '';
    const reportType = 'Daily';

    this.loadEmployeeData(startDate, endDate, reportType);
    this.subscribeToItemUpdates(); // Subscribe to SignalR updates
  }

  // Method to load data based on the selected tab
  loadEmployeeData(startDate: string, endDate: string, reportType: string): void {
    this.attendanceLogService.getAllEmployeesHours(startDate, endDate, reportType).subscribe((data) => {
      this.top5Employee = data.slice(0, 4);
      this.allEmployeesData = data;
      console.log(`Top 5 Employee Data for ${reportType}:`, this.top5Employee);
    });
  }

  // Method called when a tab is changed
  onTabChanged(reportType: string): void {
    const startDate = ''; 
    const endDate = '';
    this.loadEmployeeData(startDate, endDate, reportType);
  }

  // Subscribe to SignalR updates
  private subscribeToItemUpdates(): void {
    this.signalRService.itemUpdate$.subscribe(update => {
      if (update) {
        const activeTab = this.hoursTable?.activeTab || 'Daily'; // Get the currently active tab
        this.loadEmployeeData('', '', activeTab); // Reload data for the active tab
      }
    });
  }
}
