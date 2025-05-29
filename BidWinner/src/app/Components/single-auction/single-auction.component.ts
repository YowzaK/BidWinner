import { AuthService } from './../Auth/auth.service';
import { MyAuctionsComponent } from './../my-auctions/my-auctions.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Interfaces/User';
import { Item } from 'src/app/Interfaces/items';
import { AuctionService } from 'src/app/Services/auction.service';
import { DatabaseService } from 'src/app/Services/database.service';

@Component({
  selector: 'app-single-auction',
  templateUrl: './single-auction.component.html',
  styleUrls: ['./single-auction.component.css'],
})
export class SingleAuctionComponent implements OnInit {
  itemId: string = ' ';
  daysLeft: number = 1;
  hoursLeft: number = 1;
  minutesLeft: number = 1;
  secondsLeft: number = 1;

  isbid: boolean = false;
  bidAmount: number = 0;
  userLogged: boolean = false;
  bidOver: boolean = false;
  currentUserWonBid: boolean = false;
  countryCheck: boolean = false;

  item: Item = {
    id: '',
    userId: '',
    bids: [
      {
        bid: 0,
        userId: '',
      },
    ],
    image: '',
    category: '',
    itemName: '',
    itemDescription: '',
    condition: '',
    startingBid: null,
    endingDate: null,
    currentBids: 0,
    bidWinner: '',
  };

  placedBid: number = 0;

  currentUser: User = {
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

  wonUser: User = {
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

  constructor(
    private router: ActivatedRoute,
    private nav: Router,
    private auctionService: AuctionService,
    private databaseService: DatabaseService,
    private authService: AuthService
  ) {
    this.startCountdown();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    if (this.authService.getUserID() === '') {
      this.userLogged = false;
    } else {
      this.userLogged = true;
    }
    const id = this.router.snapshot.paramMap.get('id');
    if (!id) {
      alert('server error cannot retrive data');
    } else {
      this.itemId = id;
      this.auctionService.getItemFromId(this.itemId).then((item) => {
        this.item = item;
        this.databaseService.getUser(this.item.userId).then((user) => {
          this.user = user;
          this.isBid();
        });
      });
    }
  }

  getTimeLeft() {
    const now = new Date();
    if (this.item.endingDate) {
      const givenDate = new Date(this.item.endingDate);
      const difference = givenDate.getTime() - now.getTime();
      if (difference < 0) {
        this.bidOver = true;
        this.daysLeft = 0;
        this.hoursLeft = 0;
        this.minutesLeft = 0;
        this.secondsLeft = 0;
      } else {
        var days = Math.floor(difference / (60 * 60 * 24 * 1000));
        const hours = Math.floor(difference / (60 * 60 * 1000)) - days * 24;
        var minutes =
          Math.floor(difference / (60 * 1000)) - (days * 24 * 60 + hours * 60);
        var seconds =
          Math.floor(difference / 1000) -
          (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60);
        this.daysLeft = days;
        this.hoursLeft = hours;
        this.minutesLeft = minutes;
        this.secondsLeft = seconds;
      }
    }
  }

  private interval: any;
  startCountdown() {
    this.interval = setInterval(() => {
      this.getTimeLeft();
      if (
        this.daysLeft === 0 &&
        this.hoursLeft === 0 &&
        this.minutesLeft === 0 &&
        this.secondsLeft === 0
      ) {
        this.bidOver = true;
        this.ifAuctionWon();
        clearInterval(this.interval);
      }
    }, 1000);
  }

  //checks if the users location matches the registered location
  Bid() {
    this.databaseService
      .getUser(this.authService.getUserID())
      .then((user) => {
        this.currentUser = user;
      })
      .then(() => {
        navigator.geolocation.getCurrentPosition((postition) => {
          const lat = postition.coords.latitude;
          const long = postition.coords.longitude;
          this.databaseService
            .getLocation(lat, long)
            .then((location: string) => {
              console.log(location, this.currentUser.userCountry);
              const l: string = location;
              if (l === this.currentUser.userCountry) {
                this.countryCheck = true;
              } else {
                this.countryCheck = false;
              }
              if (this.countryCheck) {
                if (this.item.startingBid) {
                  if (this.placedBid > this.item.startingBid) {
                    this.auctionService
                      .placeBid(
                        this.item.id,
                        this.placedBid,
                        this.authService.getUserID()
                      )
                      .then(
                        (response) => {
                          alert('bid successfully placed');
                          this.ngOnInit();
                        },
                        (error) => {
                          alert('error bid cannot be placed please try again');
                        }
                      );
                  } else {
                    alert(
                      'please enter a valid bid greater than the starting bid'
                    );
                  }
                }
              } else {
                alert(
                  'You do not appear to be in the country registered to your account please change credentials and try again'
                );
              }
            });
        });
      });
  }

  showPosition(position: any) {
    console.log(
      'Latitude: ' +
        position.coords.latitude +
        '<br>Longitude: ' +
        position.coords.longitude
    );
  }

  isBid() {
    for (let i = 0; i < this.item.bids.length; i++) {
      if (this.item.bids[i].userId === this.authService.getUserID()) {
        this.bidAmount = this.item.bids[i].bid;
        this.isbid = true;
      }
    }
  }

  ifAuctionWon() {
    if (this.bidOver) {
      this.auctionService
        .getAuctionWinner(this.item.id)
        .then((response: any) => {
          if (response.userId === this.authService.getUserID()) {
            this.databaseService
              .getUser(this.authService.getUserID())
              .then((response: any) => {
                this.wonUser = response;
                this.currentUserWonBid = true;
                this.auctionService
                  .updateWonAuctions(this.item.id, this.authService.getUserID())
                  .then(() => {});
              });
          }
        });
    }
  }

  isOwner() {
    if (this.item.userId === this.authService.getUserID()) {
      return true;
    } else {
      return false;
    }
  }

  goToUser() {
    const id = this.user.userId;
    this.nav.navigate([`/user/${id}`]);
  }
}
