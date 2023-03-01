import { Component, OnInit } from '@angular/core';
import { Card } from '../cardClasses/card';

@Component({
  selector: 'collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  constructor() {}

  myCard!: Card;

  async ngOnInit() {
    this.myCard = await Card.find('xy1-1');
    console.log('your card is ' + this.myCard.name);
  }
}
