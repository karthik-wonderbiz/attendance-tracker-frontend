import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PieComponent } from './components/generic-components/pie/pie.component';
import { BarComponent } from './components/generic-components/bar/bar.component';

import { BaseChartDirective } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { LineComponent } from './components/generic-components/line/line.component';
import { TableComponent } from './components/generic-components/table/table.component';
import { CalendarComponent } from './components/generic-components/calendar/calendar.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeTablesComponent } from './components/employee-tables/employee-tables.component';
import { DataService } from './services/data.service';
import { EmployeeStatusComponent } from './components/employee-status/employee-status.component';
import { EmployeeStatusDetailsComponent } from './components/employee-status-details/employee-status-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PieComponent,
    BarComponent,
    LineComponent,
    TableComponent,
    CalendarComponent,
    LoginComponent,
    DashboardComponent,
    EmployeeTablesComponent,
    EmployeeStatusComponent,
    EmployeeStatusDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    CommonModule,
    BaseChartDirective,
    FullCalendarModule,
    HttpClientModule,
  ],
  providers: [provideCharts(withDefaultRegisterables()), provideHttpClient(), DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
