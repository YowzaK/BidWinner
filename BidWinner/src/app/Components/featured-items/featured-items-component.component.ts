import { DatabaseService } from 'src/app/Services/database.service';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/Interfaces/items';
import { AuctionService } from 'src/app/Services/auction.service';

@Component({
  selector: 'app-featured-items-component',
  templateUrl: './featured-items-component.component.html',
  styleUrls: ['./featured-items-component.component.css']
})
export class FeaturedItemsComponent implements OnInit {

  items: Item[] =[]
  ngOnInit(): void {
      this.getData();
  }

  constructor(private auctionService: AuctionService){}

  getData(){
    this.auctionService.getFeatureItems().then((items)=>{
      this.items = items;
    })

  }
}
