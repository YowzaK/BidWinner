import { initializeApp } from 'firebase/app';
import { Component, OnInit } from '@angular/core';
import { firebaseConfig } from './firebase.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BidWinner';

  ngOnInit(): void {
    initializeApp(firebaseConfig)
  }
}
