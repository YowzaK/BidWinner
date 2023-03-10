import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel-component',
  templateUrl: './carousel-component.component.html',
  styleUrls: ['./carousel-component.component.css']
})
export class CarouselComponent {
  array = [
    'https://cdn.pixabay.com/photo/2023/03/01/20/07/flowers-7823941_960_720.jpg',
    'https://cdn.pixabay.com/photo/2014/04/14/20/11/pink-324175_960_720.jpg',
    'https://cdn.pixabay.com/photo/2013/07/21/13/00/rose-165819_960_720.jpg',
    'assets/2.png',
    'https://cdn.pixabay.com/photo/2023/02/28/03/42/ibex-7819817_960_720.jpg'
  ];
}
