import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AttendanceLogService } from '../../services/attendanceLog/attendance-log.service';
import { AttendanceLogModel } from '../../model/AttendanceLog.model';

@Component({
  selector: 'app-employee-status',
  templateUrl: './employee-status.component.html',
  styleUrls: ['./employee-status.component.css']
})
export class EmployeeStatusComponent implements OnInit {
  totalEmployees: number = 0;
  workingEmployees: number = 0;
  workFromHomeEmployees: number = 0;
  absentEmployees: number = 0;

  allEmployees: any[] = [];
  filteredEmployees: any[] = [];
  filter: 'all' | 'present' | 'absent' | 'wfh' = 'all';

  constructor(private dataService: DataService, private attendanceLogService: AttendanceLogService) {}

  ngOnInit(): void {
    this.dataService.getEmployeeBasicInfo().subscribe((basicInfoData) => {
      this.totalEmployees = basicInfoData.length;
      this.dataService.getEmployeeAttendance().subscribe((attendanceData) => {
        this.workingEmployees = attendanceData.length;
        this.absentEmployees = this.totalEmployees - this.workingEmployees;
        this.workFromHomeEmployees = attendanceData.filter(employee => this.isWorkingFromHome(employee)).length;

        this.allEmployees = basicInfoData.map(employee => {
          const attendance = attendanceData.find(att => att.Employee === employee.Employee);
          const inTime = attendance ? attendance.FirstIn : null;
          return {
            id: employee.Employee,
            name: employee.Name,
            status: inTime ? 'Present' : 'Absent',
            inTime: inTime,
            image: employee.Image
          };
        });
        this.filterEmployees();
      });
    });
    this.getSummaryData();
  }

  attendanceLogModel: AttendanceLogModel ={
    userId: 0,
    inOutTime: '',
    checkType: '',
    total: 0,
    present: 0,
    wfh: 0,
    absent: 0,
    startDate: '',
    endDate: ''
  }

  getSummaryData(){
    this.attendanceLogService.getSummaryAttendance(this.attendanceLogModel.startDate, this.attendanceLogModel.endDate).subscribe((data)=>{
      this.attendanceLogModel = data;
    });
  }

  private isWorkingFromHome(employee: any): boolean {
    return employee.Employee.startsWith('ZY');
  }

  setFilter(filter: 'all' | 'present' | 'absent' | 'wfh'): void {
    this.filter = filter;
    this.filterEmployees();
  }

  private filterEmployees(): void {
    switch (this.filter) {
      case 'present':
        this.filteredEmployees = this.allEmployees.filter(employee => employee.status === 'Present');
        break;
      case 'absent':
        this.filteredEmployees = this.allEmployees.filter(employee => employee.status === 'Absent');
        break;
      case 'wfh':
        this.filteredEmployees = this.allEmployees.filter(employee => this.isWorkingFromHome(employee));
        break;
      default:
        this.filteredEmployees = [...this.allEmployees];
        break;
    }
  }
}
function getSummaryData() {
  throw new Error('Function not implemented.');
}

