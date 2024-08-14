import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { AttendanceLogService } from '../../../../services/attendanceLog/attendance-log.service';
import { AttendanceLogModel } from '../../../../model/AttendanceLog.model';


@Component({
  selector: 'app-employee-status',
  templateUrl: './employee-status.component.html',
  styleUrls: ['./employee-status.component.css']
})
export class EmployeeStatusComponent implements OnInit {
  totalEmployees: number = 0;
  presentEmployees: number = 0;
  workFromHomeEmployees: number = 0;
  absentEmployees: number = 0;

  allEmployees: any[] = [];
  filteredEmployees: any[] = [];
  filter: 'all' | 'present' | 'absent' | 'wfh' = 'all';

  constructor(private dataService: DataService, private attendanceLogService: AttendanceLogService) {}

  ngOnInit(): void {
    this.attendanceLogService.getTodayAttendanceLogStatus().subscribe((data)=>{
      this.totalEmployees = data.length;
      this.attendanceLogService.getTodayAttendanceLogStatus().subscribe((data)=>{
        this.presentEmployees = data.filter(log => log.status === 'Present').length;
        this.absentEmployees = data.filter(log => log.status === 'Absent').length;
        this.workFromHomeEmployees = data.filter(log => log.status === 'Work From Home').length;

        this.allEmployees = data.map(employee =>{
          const log = data;
          return {
            userId: employee.userId,
            inOutTime: employee.inOutTime,
            checkType: employee.checkType,
            total: employee.total,
            present: employee.present,
            wfh: employee.wfh,
            absent: employee.absent,
            startDate: employee.startDate,
            endDate: employee.endDate,
            attendanceLogTime: employee.attendanceLogTime,
            firstName: employee.firstName,
            lastName: employee.lastName,
            totalHours: employee.totalHours,
            profilePic: employee.profilePic,
            fullName: employee.fullName,
            lastCheckInTime: employee.lastCheckInTime,
            lastCheckOutTime: employee.lastCheckOutTime,
            status: employee.status === 'Present'? 'Present' : 'Absent',
            inTime: employee.status === 'Present'? employee.inTime : null
          };
        })
        this.filterEmployees();
      })
    })
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
    endDate: '',
    attendanceLogTime: '',
    firstName: '',
    lastName: '',
    totalHours: '',
    profilePic: '',
    fullName: '',
    lastCheckInTime: '',
    lastCheckOutTime: '',
    status: '',
    inTime: ''
  }

  getSummaryData(){
    this.attendanceLogService.getSummaryAttendance(this.attendanceLogModel.startDate, this.attendanceLogModel.endDate).subscribe((data)=>{
      this.attendanceLogModel = data;
    });
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
        this.filteredEmployees = this.allEmployees.filter(employee => employee.status === 'Wfh');
        break;
      default:
        this.filteredEmployees = [...this.allEmployees];
        break;
    }
  }
}