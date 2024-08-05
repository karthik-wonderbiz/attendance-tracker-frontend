import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import EmployeeModel from '../../model/EmployeeModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {

  ngOnInit() {
  }

  employee: EmployeeModel = {

    firstName: '',
    lastName: '',
    employeeEmail: '',
    employeePhone: '',
    gender: '',
    qualification: '',
    hobbies: { reading: true, music: false, chess: false },

  }

  errors = {
    firstName: 'Name is required and must be atleast 3 chars!',
    employeeEmail: 'Enter a valid email!',
    employeePhone: 'Phone is required and must be 10 digit!',
    gender: 'Select your gender!',
    qualification: 'Select your qualification!',
    hobbies: 'Select atleast one hobby to proceed!'
  };

  isInvalid = false

  isSubmitted = false

  onSubmit() {
    this.isSubmitted = true
    setTimeout(() => { this.isSubmitted = false }, 2000)
  }

  RegisterEmp(empForm: NgForm): void {
    const formData = empForm.value
    console.log(formData);
    if (this.validateForm()) {
      console.log("success")
      this.employee.firstName = ''
      this.employee.lastName = ''
      this.employee.employeeEmail = ''
      this.employee.employeePhone = ''
      this.employee.gender = ''
      this.employee.qualification = ''
      this.employee.hobbies.music = false
      this.employee.hobbies.chess = false
    }
    else {
      this.isInvalid = true
      console.log("failure")

    }
  }

  validateForm(): boolean {
    if (
      this.validateName() &&
      this.validateEmail() &&
      this.validatePhone() &&
      this.validateGender() &&
      this.validateQualification() &&
      this.validateHobbies()
    ) {
      return true
    }
    return false
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
    return phoneRegex.test(this.employee.employeePhone)
  }

  validateGender(): boolean {
    if (this.employee.gender == 'male' || this.employee.gender == 'female') {
      return true
    }
    return false
  }

  validateQualification(): boolean {
    if (this.employee.qualification == null || this.employee.qualification == undefined || this.employee.qualification == "") {
      return false
    }
    return true
  }

  validateHobbies(): boolean {
    if (this.employee.hobbies.reading == true || this.employee.hobbies.chess == true || this.employee.hobbies.music == true) {
      return true
    }
    return false
  }
}
