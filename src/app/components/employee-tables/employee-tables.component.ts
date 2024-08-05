import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { EmployeeBasicInfo } from '../../model/employee-basic-info.model';
import { EmployeeAttendance } from '../../model/employee-attendance.model';
import { EmployeeTimingDetails } from '../../model/employee-timing-details.model';

@Component({
  selector: 'app-employee-tables',
  templateUrl: './employee-tables.component.html',
  styleUrls: ['./employee-tables.component.css']
})
export class EmployeeTablesComponent implements OnInit {
  basicInfoData: EmployeeBasicInfo[] = [];
  attendanceData: EmployeeAttendance[] = [];
  timingDetailsData: EmployeeTimingDetails[] = [];

  basicInfoColumns = [
    { key: 'id', label: 'ID' },
    { key: 'Employee', label: 'Employee' },
    { key: 'Name', label: 'Name' }
  ];

  attendanceColumns = [
    { key: 'id', label: 'ID' },
    { key: 'Employee', label: 'Employee' },
    { key: 'FirstIn', label: 'First In' },
    { key: 'LastOut', label: 'Last Out' },
    { key: 'TotalHours', label: 'Total Hours' }
  ];

  timingDetailsColumns = [
    { key: 'id', label: 'ID' },
    { key: 'Employee', label: 'Employee' },
    {
      key: 'Entry', label: 'Entry', subColumns: [
        { key: 'Early', label: 'Early' },
        { key: 'Late', label: 'Late' }
      ]
    },
    {
      key: 'Exit', label: 'Exit', subColumns: [
        { key: 'Early', label: 'Early' },
        { key: 'Late', label: 'Late' }
      ]
    },
    { key: 'NetHours', label: 'Net Hours' },
    { key: 'Shift', label: 'Shift' }
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getEmployeeBasicInfo().subscribe(data => this.basicInfoData = data);
    this.dataService.getEmployeeAttendance().subscribe(data => this.attendanceData = data);
    this.dataService.getEmployeeTimingDetails().subscribe(data => this.timingDetailsData = data);
  }
}
