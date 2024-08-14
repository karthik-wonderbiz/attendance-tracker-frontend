import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttendanceLogService } from '../../../../../services/attendanceLog/attendance-log.service';
import { ActivityRecordModel } from '../../../../../model/ActivityRecord.model';
import { EncryptDescrypt } from '../../../../../utils/genericFunction';
import { EmployeeService } from '../../../../../services/employee/employee.service';
import { UserService } from '../../../../../services/user/user.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  employee: any = {};
  user: any ={};
  inOutData: any[] = [];
  selectedDate: Date = new Date();
  formattedDate: string = '';

  // Define separate column arrays
  columnsTable1 = [
    { key: 'formattedInTime', label: 'In Time' },
    { key: 'formattedOutTime', label: 'Out Time' },
    { key: 'inHours', label: 'Total In Time' },
  ];

  columnsTable2 = [
    { key: 'formattedInTime', label: 'In Time' },
    { key: 'formattedOutTime', label: 'Out Time' },
    { key: 'outHours', label: 'Total Out Time' },
  ];

  tabNames = ['Today', 'Yesterday', 'Day Before Yesterday'];
  tabs = ['today', 'yesterday', 'dayBeforeYesterday'];

  activeTab: string = 'today';

  constructor(
    private route: ActivatedRoute,
    private attendanceLogService: AttendanceLogService,
    private employeeService: EmployeeService,
    private userService: UserService
  ) {}

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  activityInRecords: ActivityRecordModel[] = [];
  activityOutRecords: ActivityRecordModel[] = [];

  startDate: string = '2024-08-08';
  endDate: string = '2024-08-09';

  ngOnInit() {
    const encryptedId = this.route.snapshot.paramMap.get('id');
    if (encryptedId) {
      const employeeId = EncryptDescrypt.decrypt(encryptedId);
      console.log('Decrypted Employee ID:', employeeId);

      this.attendanceLogService
        .getActivityRecordsInByUserId(employeeId, this.startDate, this.endDate)
        .subscribe((dataIn) => {
          this.activityInRecords = this.formatActivityRecords(dataIn);
          console.log('Activity In Records:', this.activityInRecords);
        });

      this.attendanceLogService.getActivityRecordsOutByUserId(employeeId, this.startDate, this.endDate)
      .subscribe((dataOut) => {
        this.activityOutRecords = this.formatActivityRecords(dataOut);
        console.log('Activity Out Records:', this.activityOutRecords);
      });

      this.employeeService.getEmployeeByUserId(employeeId).subscribe(data=>{
        this.employee = data;
        console.log('Employee Data:', this.employee);
      })

      this.userService.getUserById(employeeId).subscribe(data=>{
        this.user = data;
        console.log('User Data:', this.user);
      })

      this.formattedDate = this.selectedDate.toLocaleDateString();
    } else {
      console.error('Employee ID is missing in the URL');
    }
  }

  formatActivityRecords(records: ActivityRecordModel[]): ActivityRecordModel[] {
    return records.map(record => ({
      ...record,
      formattedInTime: this.extractTime(record.inTime),
      formattedOutTime: this.extractTime(record.outTime),
    }));
  }

  extractTime(dateTime: string): string {
    return dateTime.split('T')[1].split('.')[0];
  }
}
