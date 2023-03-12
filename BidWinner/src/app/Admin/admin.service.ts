import { Injectable } from '@angular/core';
import { Admin } from './Interfaces/admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  admin: Admin = {
    username:'admin',
    password: 'admin123',
  };

  adminAuthenticated: boolean = false;

  constructor() {}

  login(username: string, password: string) {
    if(this.admin.username === username && this.admin.password === password){
      this.adminAuthenticated = true;
      return true;
    }else{
      this.adminAuthenticated = false;
      return false;
    }
  }
}
