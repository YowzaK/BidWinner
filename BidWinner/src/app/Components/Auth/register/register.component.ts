import { Component, OnInit } from '@angular/core';
import { RegisterForm } from '../Auth_Interfaces';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  validateForm!: UntypedFormGroup;
  form: RegisterForm = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  passwordsMatching: boolean = true;
  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.form.password != this.form.confirmPassword) {
        this.passwordsMatching = false;
        alert('Passwords do not match');
        return;
      }
      this.authService.register(this.form);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  // submitForm() {
  //   const auth = getAuth();
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // ..
  //     });
  // }
}
