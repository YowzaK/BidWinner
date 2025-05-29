import { Item } from './../Interfaces/items';
import { Config } from './../Config/Config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  constructor(
    private http: HttpClient,
    private config: Config,
    private ngxService: NgxUiLoaderService
  ) {}

  

  //get all auctions listed on the website
  getAllAuctions(): Promise<Item> {
    this.ngxService.start();
    return new Promise<Item>((resolve, reject) => {
      this.http.get(`${this.config.BIDWINNER_API}/getAuctions`).subscribe(
        (response: any) => {
          resolve(response.data);
          this.ngxService.stop();
        },
        (error) => {
          reject(error);
          this.ngxService.stop();
        }
      );
    });
  }

  //get all the auctions of the user
  getMyAuctions(id: string): Promise<Item> {
    this.ngxService.start();
    return new Promise<Item>((resolve, reject) => {
      this.http
        .get(`${this.config.BIDWINNER_API}/getMyAuctions/${id}`)
        .subscribe(
          (response: any) => {
            resolve(response.items);
            this.ngxService.stop();
          },
          (error) => {
            reject(error);
            this.ngxService.stop();
          }
        );
    });
  }

  //get an item from ID
  getItemFromId(id: string): Promise<Item> {
    this.ngxService.start();
    return new Promise<Item>((resolve, reject) => {
      this.http
        .get(`${this.config.BIDWINNER_API}/getSingleAuction/${id}`)
        .subscribe(
          (response: any) => {
            resolve(response.data);
            this.ngxService.stop();
          },
          (error) => {
            this.ngxService.stop();
            reject(error);
          }
        );
    });
  }

  //placing a bid
  placeBid(id: string, bid: number, userId: string): Promise<any> {
    this.ngxService.start();
    const Bid = {
      bid: bid,
      userId: userId,
    };
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(`${this.config.BIDWINNER_API}/placeBid/${id}`, Bid)
        .subscribe(
          (response: any) => {
            this.ngxService.stop();
            resolve(response);
          },
          (error) => {
            this.ngxService.stop();
            reject(error);
          }
        );
    });
  }

  //get the auction winner
  getAuctionWinner(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(
          `${this.config.BIDWINNER_API}/ifAuctionWon/${id}`
        )
        .subscribe(
          (response: any) => {
            resolve(response.data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  //updates theh winner of the auction
  updateWonAuctions(id : string, userId: string): Promise<any>{
    const options = { wonAuctions : id};
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${this.config.BIDWINNER_API}/updateUserWon/${userId}` , options).subscribe((data) =>{
        resolve(data);
      }, (error)=>{
        reject(error);
      })
    })
  }

  getFeatureItems():Promise<any>{
    this.ngxService.start();
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${this.config.BIDWINNER_API}/featuredItems`).subscribe((response:any) =>{
        this.ngxService.stop();
        resolve(response.data);
      }, (error)=>{
        this.ngxService.stop();
        reject(error);
      })
      
    })
  }
}
