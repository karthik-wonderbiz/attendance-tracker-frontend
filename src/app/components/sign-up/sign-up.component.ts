import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import EmployeeModel from '../../model/employee-sign-up.model';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  employee: EmployeeModel = {
    firstName: '',
    lastName: '',
    employeeEmail: '',
    employeePhone: '',
    password: '',
    confirmPassword: '',
  };

  errors = {
    firstName: 'First name must be at least 3 chars!',
    lastName: 'Last name must be at least 1 char!',
    employeeEmail: 'Enter a valid email!',
    employeePhone: 'Phone must be 10 digits!',
    password: 'Password must be min 8 alphanumeric!',
    confirmPassword: 'Password does not match!',
  };

  isInvalid = false;
  isSubmitted = false;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.isSubmitted = true;
    setTimeout(() => { this.isSubmitted = false }, 2000);
  }

  RegisterEmp(empForm: NgForm): void {
    const formData = empForm.value;
    console.log(formData);

    if (this.validateForm()) {
      this.employeeService.saveEmployeeData(formData).subscribe(success => {
        if (success) {
          console.log("Data saved successfully");
        }
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      });
    } else {
      this.isInvalid = true;
      console.log("Validation failed");
    }
  }

  resetForm(): void {
    this.employee = {
      firstName: '',
      lastName: '',
      employeeEmail: '',
      employeePhone: '',
      password: '',
      confirmPassword: '',
    };
  }

  validateForm(): boolean {
    return (
      this.validateName() &&
      this.validateLastName() &&
      this.validateEmail() &&
      this.validatePhone() &&
      this.validatePassword() &&
      this.validateConfirmPassword()
    );
  }

  validateName(): boolean {
    const namePattern = /^[a-zA-Z]{2,}[ ]{0,1}[a-zA-Z]{1,}$/;
    return namePattern.test(this.employee.firstName);
  }

  validateLastName(): boolean {
    const namePattern = /^[a-zA-Z]{0,}[ ]{0,1}[a-zA-Z]{1,}$/;
    return namePattern.test(this.employee.lastName);
  }

  validateEmail(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(this.employee.employeeEmail);
  }

  validatePhone(): boolean {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(this.employee.employeePhone);
  }

  validatePassword(): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;
    return regex.test(this.employee.password);
  }

  validateConfirmPassword(): boolean {
    return this.employee.password === this.employee.confirmPassword;
  }

  @Input() isNewUser?: boolean;
  @Output() signUpStatusChange = new EventEmitter<boolean>();

  onBackToLogin() {
    this.signUpStatusChange.emit(false);
  }


}
