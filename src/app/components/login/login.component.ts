import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import LoginModel from '../../model/employee-login.model';
import { LoginService } from '../../shared/services/login/login.service';

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
  isLoginSuccessful = false;

  validateEmail(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(this.loginData.email);
  }

  @Output() loginStatusChange = new EventEmitter<boolean>();
  @Output() signUpStatusChange = new EventEmitter<boolean>();

  private loginApiUrl = 'http://192.168.29.46:5000/api/user/log-in';

  constructor(
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService,
  ) { }

  onLogin(loginForm: NgForm): void {
    const loginData: LoginModel = {
      email: this.loginData.email,
      password: this.loginData.password
    }
    console.log(loginData)
    if (this.validateEmail() && this.loginData.password != '') {
      this.loginService.Login(loginData).pipe().subscribe({
        next: (response) => {
          console.log(JSON.stringify(response))
        },
        error: (error) => {
          // console.log(JSON.stringify(error.error))
          this.isInvalid = true
          this.loginError = error.error
          this.loginStatusChange.emit(false);
          this.isLogSubmitted = true;
          setTimeout(() => { this.isLogSubmitted = false }, 900);
        },
        complete: () => {
          console.log(JSON.stringify("Login Success"))
          this.loginError = '';
          this.isInvalid = false;
          this.loginStatusChange.emit(true);
          this.isLoginSuccessful = true;
          setTimeout(() => { this.isLoginSuccessful = false }, 1000);
          setTimeout(() => {
            this.router.navigate(['admin']);
          }, 1000);
        }
      })
    }
    else {
      console.log('Login failed');
      this.loginError = 'Invalid Credentials';
      this.isInvalid = true;
      this.loginStatusChange.emit(false);
      this.isLogSubmitted = true;
      setTimeout(() => { this.isLogSubmitted = false }, 900);
    }

    // this.http.post<{ token: string }>(this.loginApiUrl, loginData).subscribe(
    //   response => {
    //     console.log('Login successful');
    //     this.auth.setToken(response.token);
    //     this.loginError = '';
    //     this.isInvalid = false;
    //     this.loginStatusChange.emit(true);
    //     this.router.navigate(['admin']);
    //   },
    //   error => {
    //     console.log('Login failed');
    //     this.loginError = 'Invalid email or password!';
    //     this.isInvalid = true;
    //     this.loginStatusChange.emit(false);
    //     this.isLogSubmitted = true;
    //     setTimeout(() => { this.isLogSubmitted = false }, 900);
    //   }
    // );
  }

  onSignUp() {
    this.signUpStatusChange.emit(true);
  }
}
