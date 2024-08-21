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
    email: '',
    password: ''
  };

  loginError = '';
  isInvalid = false;
  isLogSubmitted = false;

  @Output() loginStatusChange = new EventEmitter<boolean>();
  @Output() signUpStatusChange = new EventEmitter<boolean>();

  constructor(private employeeService: EmployeeService, private router: Router, private auth: AuthService) { }

  onLogin(loginForm: NgForm): void {
    const loginData = loginForm.value;
    this.employeeService.getEmployeeData().subscribe(employee => {
      if (employee && employee.email === loginData.email && employee.password === loginData.password) {
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
        this.isLogSubmitted = true;
        setTimeout(() => { this.isLogSubmitted = false }, 900);
      }
    });
  }

  onSignUp() {
    this.signUpStatusChange.emit(true);
  }

}
