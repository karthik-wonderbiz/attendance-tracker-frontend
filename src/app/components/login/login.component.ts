import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';

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
  isInvalid = false;

  @Output() loginStatusChange = new EventEmitter<boolean>();
  @Output() signUpStatusChange = new EventEmitter<boolean>();

  constructor(private employeeService: EmployeeService, private router: Router, private auth: AuthService) {}

  onLogin(loginForm: NgForm): void {
    const formData = loginForm.value;
    this.employeeService.getEmployeeData().subscribe(employee => {
      if (employee && employee.employeeEmail === formData.employeeEmail && employee.password === formData.password) {
        console.log('Login successful');
        this.loginError = '';
        this.isInvalid = false;
        this.loginStatusChange.emit(true);
        // this.router.navigate(['/dashboard']);
        this.router.navigate(['admin']);
      } else {
        console.log('Login failed');
        this.loginError = 'Invalid email or password!';
        this.isInvalid = true;
        this.loginStatusChange.emit(false);
      }
    });
  }

  onSignUp(){
    this.signUpStatusChange.emit(true);
  }

}
