import { createComponent, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PieComponent } from './components/generic-components/pie/pie.component';
import { BarComponent } from './components/generic-components/bar/bar.component';
import { LineComponent } from './components/generic-components/line/line.component';
import { TableComponent } from './components/generic-components/table/table.component';
import { CalendarComponent } from './components/generic-components/calendar/calendar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeStatusComponent } from './components/employee-status/employee-status.component';
import { EmployeeStatusDetailsComponent } from './components/employee-status-details/employee-status-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SectionComponent } from './components/section/section.component';
import { TopEmployeesComponent } from './components/top-employees/top-employees.component';
import { TableWithTabsComponent } from './components/generic-components/table-with-tabs/table-with-tabs.component';
import { EmployeeDetailComponent } from './components/generic-components/employee-detail/employee-detail.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { DataService } from '../../services/data.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EmployeeAttendanceRecordsComponent } from '../../components/employee-attendance-records/employee-attendance-records.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    PieComponent,
    BarComponent,
    LineComponent,
    TableComponent,
    CalendarComponent,
    DashboardComponent,
    EmployeeStatusComponent,
    EmployeeStatusDetailsComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    SectionComponent,
    TopEmployeesComponent,
    TableWithTabsComponent,
    EmployeeDetailComponent,
    EmployeeAttendanceRecordsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    FormsModule,
    BaseChartDirective,
    FullCalendarModule,
    HttpClientModule
  ],
  providers: [provideCharts(withDefaultRegisterables()), provideHttpClient(), DataService],

})
export class AdminModule { }
