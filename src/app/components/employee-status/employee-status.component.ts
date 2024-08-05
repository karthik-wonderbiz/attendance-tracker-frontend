import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

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

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getEmployeeBasicInfo().subscribe((data) => {
      this.totalEmployees = data.length;
    });

    this.dataService.getEmployeeAttendance().subscribe((data) => {
      this.workingEmployees = data.length;
      this.absentEmployees = this.totalEmployees - this.workingEmployees;
      this.workFromHomeEmployees = data.filter(employee => {
        return this.isWorkingFromHome(employee);
      }).length;
    });
  }

  private isWorkingFromHome(employee: any): boolean {
    return employee.Employee.startsWith('ZY');
  }
}
