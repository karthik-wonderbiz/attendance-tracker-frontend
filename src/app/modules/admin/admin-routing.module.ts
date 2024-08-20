import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeDetailComponent } from './components/generic-components/employee-detail/employee-detail.component';
import { EmployeeLogRecordsComponent } from './components/employee-log-records/employee-log-records.component';
import { EmployeeStatusDetailsComponent } from './components/employee-status-details/employee-status-details.component';
import { TopEmployeesComponent } from './components/top-employees/top-employees.component';
import { EmployeeAttendanceRecordsComponent } from './components/employee-attendance-records/employee-attendance-records.component';
import { AllEmployeesComponent } from './components/all-employees/all-employees.component';
import { AllTopEmployeesComponent } from './components/all-top-employees/all-top-employees.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'about', component: AboutComponent },
      { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employee-detail/:id', component: EmployeeDetailComponent },
      { path: 'empLogs', component: EmployeeLogRecordsComponent },
      { path: 'employee-status-details', component: EmployeeStatusDetailsComponent },
      {path:'topFiveEmployees', component: TopEmployeesComponent},
      {path:'empTodayWorking', component: EmployeeAttendanceRecordsComponent},
      {path:'employees', component: AllEmployeesComponent},
      {path:'empLogRecords', component: EmployeeLogRecordsComponent},
      { path: 'all-top-employees/:type', component: AllTopEmployeesComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
