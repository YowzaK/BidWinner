import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-header-navbar-component',
  templateUrl: './header-navbar-component.component.html',
  styleUrls: ['./header-navbar-component.component.css'],
})
export class HeaderNavbarComponent implements OnInit {
  
  ngOnInit(): void {

  }
  constructor(private authService: AuthService, private router: Router){ 
  }

  isAuthenticated(){
    return this.authService.isAuthenticated;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['']);

  }
}
