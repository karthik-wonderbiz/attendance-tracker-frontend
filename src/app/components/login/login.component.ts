import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    employeeEmail: '',
    password: ''
  };

  loginError = '';

  @Output() loginStatusChange = new EventEmitter<boolean>();

  constructor(private employeeService: EmployeeService, private router: Router) {}

  onLogin(loginForm: NgForm): void {
    const formData = loginForm.value;
    this.employeeService.getEmployeeData().subscribe(employee => {
      if (employee && employee.employeeEmail === formData.employeeEmail && employee.password === formData.password) {
        console.log('Login successful');
        this.loginError = '';
        this.loginStatusChange.emit(true);
        this.router.navigate(['/dashboard']);
      } else {
        console.log('Login failed');
        this.loginError = 'Invalid email or password';
        this.loginStatusChange.emit(false);
      }
    });
  }
}
