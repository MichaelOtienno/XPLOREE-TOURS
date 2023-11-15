import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  ImagePath!: string;
  imagePaths: string[] = [
    '/assets/nakuru.jpg',
    '/assets/naivasha.jpg',
    '/assets/samburu.jpg',
    '/assets/leopard.jpg'

  ];

  ngOnInit() {
    this.selectRandomImage();
    
  }
  
  selectRandomImage() {
   
    const randomIndex = Math.floor(Math.random() * this.imagePaths.length);
    this.ImagePath = this.imagePaths[randomIndex];
  }

//form validation
userName: string = '';
email: string = '';
phone_no: string = '';
password: string = '';
confirm_password: string = '';
registerError: string = '';

constructor(private http: HttpClient, private router: Router, private authservice:AuthService,) {}

onSubmit() {
  //form validation
  if (
    this.userName === '' ||
    this.email === '' ||
    this.phone_no === '' ||
    this.password === '' ||
    this.confirm_password === ''
  ) {

    this.registerError = 'Please fill all fields';
    setTimeout(() => {
      this.registerError = '';
    }, 3000);
    return;
  }

  if (this.password.length < 8) {
    this.registerError = 'Password must be at least 8 characters';
    setTimeout(() => {
      this.registerError = '';
    }, 3000);
    return;
  }

  if (this.password !== this.confirm_password) {
    this.registerError = 'Passwords do not match';
    setTimeout(() => {
      this.registerError = '';
    }, 3000);
    return;
  }

  const requestData = {
    userName: this.userName,
    email: this.email,
    phone_no: this.phone_no,
    password: this.password
  };

  

 this.authservice.registerUser(requestData).subscribe(
      (data: any) => {
        console.log(data);
        this.gotoLogin();
      },
      (error) => {
        console.error('Registration failed. Server returned:', error);
        const errorResponse = error.error
        if (errorResponse && errorResponse.message) {
          this.registerError = errorResponse.message;
        } else if (errorResponse && errorResponse.error) {
          this.registerError = errorResponse.error;
        } else {
          this.registerError = 'Network error. We will back soon';
        }
        this.clearRegisterError(5000);
      }
    );
}


clearRegisterError(delay: number) {
  setTimeout(() => {
    this.registerError = ''; 
  }, delay);
}


gotoLogin() {
  this.router.navigate(['/signin']);
}

}
