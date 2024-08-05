import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PieComponent } from './components/generic-components/pie/pie.component';
import { BarComponent } from './components/generic-components/bar/bar.component';
import { LineComponent } from './components/generic-components/line/line.component';
import { CalendarComponent } from './components/generic-components/calendar/calendar.component';
import { TableComponent } from './components/generic-components/table/table.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: "pie", component: PieComponent },
  { path: "bar", component: BarComponent },
  { path: "line", component: LineComponent },
  { path: "calendar", component: CalendarComponent },
  { path: "table", component: TableComponent },
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
