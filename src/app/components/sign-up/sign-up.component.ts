import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import EmployeeModel from '../../model/employee-sign-up.model';
import { EmployeeService } from '../../services/employee.service';

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
    firstName: 'Name is required and must be at least 3 chars!',
    employeeEmail: 'Enter a valid email!',
    employeePhone: 'Phone is required and must be 10 digits!',
    password: 'Create a valid password!',
    confirmPassword: 'Password does not match!',
  };

  isInvalid = false;
  isSubmitted = false;

  constructor(private employeeService: EmployeeService) {}

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

  validateEmail(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(this.employee.employeeEmail);
  }

  validatePhone(): boolean {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(this.employee.employeePhone);
  }

  validatePassword(): boolean {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
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
