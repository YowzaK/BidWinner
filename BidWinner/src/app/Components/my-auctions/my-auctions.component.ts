import { Component, OnInit } from '@angular/core';
import { AuctionService } from 'src/app/Services/auction.service';
import { getAuth } from 'firebase/auth';
import { AuthService } from '../Auth/auth.service';
import { Item } from 'src/app/Interfaces/items';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-auctions',
  templateUrl: './my-auctions.component.html',
  styleUrls: ['./my-auctions.component.css'],
})
export class MyAuctionsComponent implements OnInit {
  ngOnInit(): void {
    this.getAuctions();
  }
  items: Item[] =[];
  
  constructor(
    private auctionService: AuctionService,
    private authService: AuthService,
    private router: Router
  ) {}
  getAuctions() {
    this.auctionService
      .getMyAuctions(this.authService.getUserID())
      .then((data: any) => {
        this.items = data;        
      });
  }

  fullCard(id:string){
    this.router.navigate([`/auction/${id}`]);
  }
}
