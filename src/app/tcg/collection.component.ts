import { Component, OnInit } from '@angular/core';
import { Card } from '../cardClasses/card';
import { IDeck } from '../cardInterfaces/deck';
import { IQuery } from '../cardInterfaces/query';

@Component({
  selector: 'collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  constructor() {}

  myCard!: Card;
  myDeck!: IDeck;
  cards: Card[] = [];
  searchValue: string = '';

  async getCardsByQuery() {
    const query: IQuery[] = [{ name: 'q', value: 'name:' + this.searchValue }];
    this.cards = await Card.where(query);
    console.log('Searching for: ' + query.at(0)?.name + query.at(0)?.value);
  }

  async ngOnInit() {
    this.myCard = await Card.find('xy1-1');
    console.log('your card is ' + this.myCard.name);
  }
}
