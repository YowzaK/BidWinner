import { LoginForm, RegisterForm } from './Auth_Interfaces';
import { Injectable } from '@angular/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {Router} from "@angular/router"

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  constructor(private router: Router) {}

  login(form: LoginForm) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        this.isAuthenticated = true;
        alert('Successfully signed in');
        this.router.navigate(['']);
      })
      .catch((error) => {
        this.isAuthenticated = false;
        alert('Wrong credentials please try again');
      })
  }

  register(form: RegisterForm) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        this.isAuthenticated = true;
        alert('successfully created user');
        this.router.navigate(['']);
      })
      .catch((error) => {
        alert('error creating user');
        this.isAuthenticated = false;
      });
  }
}
