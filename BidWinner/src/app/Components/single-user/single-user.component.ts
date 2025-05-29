import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Interfaces/User';
import { Item } from 'src/app/Interfaces/items';
import { DatabaseService } from 'src/app/Services/database.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit{

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
    wonAuctions: [],
  };

  auctions: Item[] = [];

  ngOnInit(): void {
      this.getData()
  }
  constructor(private router: ActivatedRoute,private databaseService: DatabaseService, private nav: Router) {
  }

  getData(){
    const id = this.router.snapshot.paramMap.get('id');    
    if (!id) {
      alert('server error cannot retrive data');
    } else {
      this.databaseService.getUser(id).then((user)=>{
        this.user =user;
        this.getMyAuctions();
      })
    }
  }

  getMyAuctions(){
    this.databaseService.getMyAcutions(this.user.userId).then((response)=>{
      this.auctions = response.items          
    })
  }

  fullCard(id:string){
    this.nav.navigate([`/auction/${id}`]);
  }

}
