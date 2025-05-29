import { initializeApp } from 'firebase/app';
import { Component, OnInit } from '@angular/core';
import { firebaseConfig } from './firebase.config';
import { SPINNER } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BidWinner';
  SPINNER = SPINNER;

  ngOnInit(): void {
    initializeApp(firebaseConfig)
  }
}
