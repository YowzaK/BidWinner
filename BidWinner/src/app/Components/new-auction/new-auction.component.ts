import { AuthService } from './../Auth/auth.service';
import { Item, Image, Dates } from './../../Interfaces/items';
import { v4 as uuidv4 } from 'uuid';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { DatabaseService } from 'src/app/Services/database.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-auction',
  templateUrl: './new-auction.component.html',
  styleUrls: ['./new-auction.component.css'],
})
export class NewAuctionComponent implements OnInit {
  auctionForm!: UntypedFormGroup;
  constructor(
    private ngxService: NgxUiLoaderService,
    private fb: UntypedFormBuilder,
    private databaseService: DatabaseService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.auctionForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      startingBid: [null, [Validators.required]],
      endingDate: [null, [Validators.required]],
    });
  }

  images: Image = {
    image: [],
  };

  auctionEndingDate: any = null;

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
    category: 'Select a category',
    itemName: '',
    itemDescription: '',
    condition: 'Select a condition',
    startingBid: null,
    endingDate: null,
    currentBids: 0,
    bidWinner: ''
  };
  imageURL: any = '';
  onSelect(event: any) {
    this.images.image.push(...event.addedFiles);
  }
  onRemove(event: any) {
    this.images.image.splice(this.item.image.indexOf(event), 1);
  }

  onChange(result: Date): void {}
  onOk(result: Date | Date[] | null): void {
    this.auctionEndingDate = result;
  }
  submitForm() {
    if (
      this.auctionForm.valid &&
      this.item.condition != 'Select a condition' &&
      this.item.category != 'Select a category' &&
      this.images.image[0] != null
    ) {
      const formData: FormData = new FormData();
      formData.append('foo', this.images.image[0]);
      const uniqueId = uuidv4();
      this.databaseService.uploadImage(formData, uniqueId).then(() => {
        this.item.id = uniqueId;
        this.item.itemName = this.auctionForm.value.name;
        this.item.itemDescription = this.auctionForm.value.description;
        this.item.startingBid = this.auctionForm.value.startingBid;
        this.item.userId = this.authService.getUserID();
        this.item.image = this.databaseService.imageURL;
        this.item.endingDate = this.auctionEndingDate;
        this.databaseService.addNewAuction(this.item).then(() => {
          alert('Your auction is now Live');
          this.router.navigate(['']);
        });
      });
    } else {
      Object.values(this.auctionForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  conditionUsed() {
    this.item.condition = 'Used';
  }

  conditionNew() {
    this.item.condition = 'New';
  }

  categoryElectronics() {
    this.item.category = 'Electronics';
  }
  categoryFurniture() {
    this.item.category = 'Furniture';
  }
  categoryOther() {
    this.item.category = 'Other';
  }
}
