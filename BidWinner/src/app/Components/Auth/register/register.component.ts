import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RegisterForm } from '../Auth_Interfaces';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from 'src/app/Interfaces/User';
import { DatabaseService } from 'src/app/Services/database.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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
      address: [null, [Validators.required]],
    });
  }

  validateForm!: UntypedFormGroup;
  form: RegisterForm = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userAddress: '',
  };

  user: User = {
    userId: '',
    userName: '',
    email: '',
    userBids: [
      {
        itemId: '',
        bid: 0,
      },
    ],
    userAuctions: [],
    userCountry: 'Choose your country',
    userAddress: '',
    userVerified: false,
    wonAuctions: [],
  };

  passwordsMatching: boolean = true;
  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  submitForm(): void {
    this.form.password = this.validateForm.value.password;
    this.form.confirmPassword = this.validateForm.value.confirmPassword;
    this.form.username = this.validateForm.value.username;
    this.form.email = this.validateForm.value.email;
    this.form.userAddress = this.validateForm.value.address;

    if (this.validateForm.valid) {
      if (this.form.password != this.form.confirmPassword) {
        this.passwordsMatching = false;
        alert('Passwords do not match');
        return;
      }
      this.authService.register(this.form).then(() => {
        //this.user.userCountry = this.validateForm.value.country;
        this.user.userId = this.authService.getUserID();
        this.user.email = this.form.email;
        this.user.userName = this.form.username;
        this.user.userAddress = this.form.userAddress;
        this.databaseService.addNewUser(this.user).then(() => {
          alert('successfully created user');
          this.router.navigate(['']);
        });
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  countrySelectedSL() {
    this.user.userCountry = 'Sri Lanka';
  }

  countrySelectedUK() {
    this.user.userCountry = 'UK';
  }
}
