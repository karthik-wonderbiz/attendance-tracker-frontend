import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttendanceLogService } from '../../../../../services/attendanceLog/attendance-log.service';
import { ActivityRecordModel } from '../../../../../model/ActivityRecord.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  employee: any = {};
  inOutData: any[] = [];
  selectedDate: Date = new Date();
  formattedDate: string = '';

  // Define separate column arrays
  columnsTable1 = [
    { key: 'inTime', label: 'In Time' },
    { key: 'outTime', label: 'Out Time' },
    { key: 'inHours', label: 'Total In Time' },
  ];

  columnsTable2 = [
    { key: 'inTime', label: 'In Time' },
    { key: 'outTime', label: 'Out Time' },
    { key: 'inHours', label: 'Total Out Time' },
  ];

  tabNames = ['Today', 'Yesterday', 'Day Before Yesterday'];
  tabs = ['today', 'yesterday', 'dayBeforeYesterday'];

  activeTab: string = 'today';

  constructor(
    private route: ActivatedRoute,
    private attendanceLogService: AttendanceLogService
  ) {}

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  activityRecords: ActivityRecordModel[] = [];

  startDate: string = '2024-08-09';
  endDate: string = '2024-08-09';

  ngOnInit() {
    const employeeId = this.route.snapshot.paramMap.get('id');
    console.log(employeeId);
    if (employeeId) {
      this.attendanceLogService
        .getActivityRecordsByUserId(employeeId, this.startDate, this.endDate)
        .subscribe((data) => {
          this.activityRecords = data;
          console.log('Activity Records:', this.activityRecords);
        });
  
      this.formattedDate = this.selectedDate.toLocaleDateString();
    }
  }  
}
