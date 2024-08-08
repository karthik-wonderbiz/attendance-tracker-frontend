import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: any = {};
  inOutData: any[] = [];
  selectedDate: Date = new Date();
  formattedDate: string = '';

  columns = [
    { key: 'inTime', label: 'In Time' },
    { key: 'outTime', label: 'Out Time' }
  ];
  tabNames = ['Today', 'Yesterday', 'Day Before Yesterday'];
  tabs = ['today', 'yesterday', 'dayBeforeYesterday'];

  activeTab: string = 'today';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.updateInOutData();
  }

  ngOnInit() {
    const employeeId = this.route.snapshot.paramMap.get('id');
    console.log(employeeId);
    if (employeeId) {
      this.dataService.getEmployeeById(employeeId).subscribe(data => {
        this.employee = data;
        console.log('Selected Employee:', this.employee);
        this.updateInOutData();
      });
    }
    
    this.formattedDate = this.selectedDate.toLocaleDateString();
  }

  updateInOutData(): void {
    if (this.employee && this.employee.TodaysInOut) {
      this.inOutData = this.employee.TodaysInOut || [];
      console.log(this.inOutData);
    }
  }
}
