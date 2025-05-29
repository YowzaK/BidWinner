import { Router } from '@angular/router';
import { AdminService } from './../../../Admin/admin.service';

import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginForm } from '../Auth_Interfaces';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  validateForm!: UntypedFormGroup;

  form: LoginForm = {
    email: '',
    password: '',
  };
  constructor(private fb: UntypedFormBuilder, private authService: AuthService, private adminService: AdminService, private router:Router) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      if(this.adminService.login(this.form.email, this.form.password)){
        this.router.navigate(['/admin']);
      }else{
        this.authService.login(this.form);
      }
      
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  } 

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}
