import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/Interfaces/items';
import { AuctionService } from 'src/app/Services/auction.service';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css'],
})
export class AuctionsComponent implements OnInit {
  ngOnInit(): void {
    this.getData();
  }
  auctions: Item[] = [];

  constructor(private auctionService: AuctionService, private router: Router) {}

  getData() {
    this.auctionService.getAllAuctions().then(
      (data: any) => {
        this.auctions = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  fullCard(id: string) {
    this.router.navigate([`/auction/${id}`]);
  }
}
