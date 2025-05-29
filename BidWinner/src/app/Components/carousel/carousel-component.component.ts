import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel-component',
  templateUrl: './carousel-component.component.html',
  styleUrls: ['./carousel-component.component.css']
})
export class CarouselComponent {
  array = [
    '/assets/carousel1.gif', '/assets/carousel2.gif', '/assets/carousel3.gif'
  ];
}
