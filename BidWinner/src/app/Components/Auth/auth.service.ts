import { firebaseConfig } from './../../firebase.config';
import { User } from './../../Interfaces/User';
import { LoginForm, RegisterForm } from './Auth_Interfaces';
import { Injectable } from '@angular/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { Router } from '@angular/router';
import {initializeApp} from 'firebase/app';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  userID: string = '';
  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  constructor(private router: Router, private ngxService: NgxUiLoaderService) {
    initializeApp(firebaseConfig);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isAuthenticated = true;
        this.userID = user.uid;
      } else {
        this.isAuthenticated = false;
        this.userID = '';
      }
    });
  }

  login(form: LoginForm) {
    this.ngxService.start()
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        this.isAuthenticated = true;
        this.userID = userCredential.user.uid;
        this.ngxService.stop();
        alert('successfully logged in');
        this.router.navigate(['']);
      })
      .catch((error) => {
        this.ngxService.stop();
        this.isAuthenticated = false;
        alert('Wrong credentials please try again');
      });
  }

  register(form: RegisterForm): Promise<any> {
    this.ngxService.start()
    return new Promise<any>((resolve, reject) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
          this.userID = userCredential.user.uid;
          this.isAuthenticated = true;
          this.ngxService.stop();
          resolve('success');
        })
        .catch((error) => {
          this.ngxService.stop();
          reject(error);
        });
    });
  }

  logout() {
    this.ngxService.start()
    const auth = getAuth()
    auth.signOut().then(() =>{
      this.isAuthenticated = false;
      this.userID = '';
      this.ngxService.stop()
      this.router.navigate(['/login']);
    })
    
  }

  getUserID() {
    return this.userID;
  }
}
