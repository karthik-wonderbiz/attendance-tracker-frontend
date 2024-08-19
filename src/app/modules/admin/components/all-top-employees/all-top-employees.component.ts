import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttendanceLogService } from '../../../../services/attendanceLog/attendance-log.service';

@Component({
  selector: 'app-all-top-employees',
  templateUrl: './all-top-employees.component.html',
  styleUrls: ['./all-top-employees.component.css']
})
export class AllTopEmployeesComponent implements OnInit {
  type: string | null = null;
  allEmployeeData: any[] = [];
  columns = [
    { key: 'fullName', label: 'Employee Name' },
    { key: 'totalHours', label: 'Total Hours' }
  ];
  tabs = ['All-Time', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
  tabNames = ['All Time', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
  activeTab: string = 'Daily';

  constructor(
    private route: ActivatedRoute,
    private attendanceLogService: AttendanceLogService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type');
      this.loadData(this.activeTab);
    });
  }

  loadData(reportType: string): void {
    this.attendanceLogService.getAllEmployeesHours('', '', reportType).subscribe(data => {
      this.allEmployeeData = data;
      console.log(`Top 5 Employee Data for ${reportType}:`, this.allEmployeeData);
    });
  }

  onTabChanged(reportType: string): void {
    this.activeTab = reportType;
    this.loadData(reportType);
  }
}
