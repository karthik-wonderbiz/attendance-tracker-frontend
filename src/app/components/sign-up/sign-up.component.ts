import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import EmployeeModel from '../../model/employee-sign-up.model';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import ConfirmPassword from '../../model/confirm-password.model';

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
    profilePic: '',
  };
  confirmPass: ConfirmPassword = {
    confirmPassword: '',
  }

  errors = {
    firstName: 'First name must be at least 3 chars!',
    lastName: 'Last name must be at least 1 char!',
    employeeEmail: 'Enter a valid email!',
    employeePhone: 'Phone must be 10 digits!',
    password: 'Pass must be min 8 alphanumerics!',
    confirmPassword: 'Password does not match!',
    profilePic: 'Profile Photo is required!',
  };

  isInvalid = false;
  isSubmitted = false;

  constructor(private employeeService: EmployeeService, private router: Router, private sanitizer: DomSanitizer, private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.isSubmitted = true;
    setTimeout(() => { this.isSubmitted = false }, 2000);
  }

  RegisterEmp(empForm: NgForm): void {
    // const loginData = empForm.value;
    // console.log(loginData);
    const loginData: EmployeeModel = {
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      employeeEmail: this.employee.employeeEmail,
      employeePhone: this.employee.employeePhone,
      password: this.employee.password,
      profilePic: this.employee.profilePic,
    };
    console.log(loginData)

    if (this.validateForm()) {
      this.employeeService.saveEmployeeData(loginData).subscribe(success => {
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
      profilePic: '',
    };
    this.confirmPass.confirmPassword = '';
  }

  validateForm(): boolean {
    return (
      this.validateName() &&
      this.validateLastName() &&
      this.validateEmail() &&
      this.validatePhone() &&
      this.validatePassword() &&
      this.validateConfirmPassword() &&
      this.validateProfilePic()
    );
  }

  validateName(): boolean {
    const namePattern = /^[a-zA-Z]{3,}$/;
    return namePattern.test(this.employee.firstName);
  }

  validateLastName(): boolean {
    const namePattern = /^[a-zA-Z]{1,}$/;
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
    return this.employee.password === this.confirmPass.confirmPassword;
  }

  validateProfilePic(): boolean {
    if(this.employee.profilePic == "" || this.employee.profilePic === null || this.employee.profilePic === undefined){
      return false
    }
    return true
  }

  @Input() isNewUser?: boolean;
  @Output() signUpStatusChange = new EventEmitter<boolean>();

  onBackToLogin() {
    this.signUpStatusChange.emit(false);
  }

  thumbnail: SafeUrl | undefined;
  imageId: number | undefined;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        this.saveImageToDatabase(base64String);
        const objectURL = 'data:image/jpeg;base64,' + base64String;
        this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      };

      reader.readAsDataURL(file);
    }
  }

  saveImageToDatabase(base64String: string): void {
    const imageData = { imageData: base64String };

    this.http.post('http://localhost:5029/api/images', imageData)
      .subscribe(response => {
        console.log('Image saved successfully', response);
      }, error => {
        console.error('Error saving image', error);
      });
  }

  getImageFromDatabase(imageId: number | undefined): void {
    if (imageId !== undefined) {
      this.http.get(`http://localhost:5029/api/images/${imageId}`, { responseType: 'blob' })
        .subscribe(blob => {
          const objectURL = URL.createObjectURL(blob);
          this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }, error => {
          console.error('Error fetching image', error);
        });
    }
  }

}
