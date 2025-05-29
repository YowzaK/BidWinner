import { Config } from './../Config/Config';
import { Item } from './../Interfaces/items';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Interfaces/User';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(
    private http: HttpClient,
    private config: Config,
    private ngxService: NgxUiLoaderService
  ) {}

  imageURL: string = '';

  //AIzaSyDujbbrzCRqrSF0hkrezDg0Vpi8iS40ZsU

  //function used to parse the address from location
  getCountry(address: string) {
    const splitAddress = address.split(',');
    const countryIndex = splitAddress.length - 1;
    const country = splitAddress[countryIndex].trim();
    return country;
  }
  

  //gets the location from googel gecode API
  getLocation(lat: number, long: number): Promise<any> {
    this.ngxService.start();
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyDujbbrzCRqrSF0hkrezDg0Vpi8iS40ZsU`
        )
        .subscribe(
          (location: any) => {
            const address = location.results[0].formatted_address;
            const country = this.getCountry(address);
            this.ngxService.stop();
            resolve(country);
          },
          (error) => {
            this.ngxService.stop();
            reject(error);
          }
        );
    });
  }

  //uploads images to firebase storage
  uploadImage(image: any, name: string): Promise<any> {
    this.ngxService.start();
    return new Promise<string>((resolve, reject) => {
      this.http
        .post(`${this.config.BIDWINNER_API}/addImage/${name}`, image)
        .subscribe(
          (response: any) => {
            this.imageURL = response.downloadUrl;
            this.ngxService.stop();
            resolve(this.imageURL);
          },
          (error) => {
            this.ngxService.stop();
            reject(error);
          }
        );
    });
  }

  //adds a new Auction
  addNewAuction(item: Item): Promise<any> {
    this.ngxService.start();
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${this.config.BIDWINNER_API}/newItem`, item).subscribe(
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

  //adds a new user
  addNewUser(user: User): Promise<any> {
    this.ngxService.start();
    return new Promise<any>((resolve, reject) => {
      this.http.post(`${this.config.BIDWINNER_API}/newUser`, user).subscribe(
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

  //get a user
  getUser(userId: string): Promise<User> {
    this.ngxService.start();
    return new Promise<User>((resolve, reject) => {
      this.http
        .get(`${this.config.BIDWINNER_API}/getUserData/${userId}`)
        .subscribe(
          (response: any) => {
            this.ngxService.stop();
            resolve(response.data);
          },
          (error) => {
            this.ngxService.stop();
            reject(error);
          }
        );
    });
  }

  //get all the auctions held by user
  getMyAcutions(userId: string): Promise<any> {
    this.ngxService.start();
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(`${this.config.BIDWINNER_API}/getMyAuctions/${userId}`)
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

  //uploads the face to firebase storage and verifies it
  uploadFaceAndVerify(id: string): Promise<any> {
    this.ngxService.start();
    return new Promise<any>((resolve, reject) => {
      this.http.get(`${this.config.BIDWINNER_API}/verifyuser/${id}`).subscribe(
        (response) => {
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
}
