import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/User';
import { DatabaseService } from 'src/app/Services/database.service';
import { AuthService } from './../Auth/auth.service';
import { Item } from 'src/app/Interfaces/items';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  ngOnInit(): void {
    this.getUser();
  }
  auctions: Item[] = [];
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
    userCountry: '',
    userAddress: '',
    userVerified: false,
    wonAuctions:[]
  };
  constructor(
    private databaseService: DatabaseService,
    private authService: AuthService,
    private router: Router
  ) {}

  getUser() {
    this.databaseService.getUser(this.authService.getUserID()).then(
      (user) => {
        this.user = user;
        this.getMyAuctions();
      },
      (error) => {
        alert('error retrieveing user');
      }
    );
  }

  getMyAuctions(){
    this.databaseService.getMyAcutions(this.user.userId).then((response)=>{
      this.auctions = response.items          
    })
  }

  fullCard(id:string){
    this.router.navigate([`/auction/${id}`]);
  }
}
