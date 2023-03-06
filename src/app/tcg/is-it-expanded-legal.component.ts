import { Component, OnInit } from '@angular/core';
import { Card } from '../cardClasses/card';

@Component({
  selector: 'is-it-expanded-legal',
  templateUrl: './is-it-expanded-legal.component.html',
  styleUrls: ['./is-it-expanded-legal.component.css'],
})
export class IsItExpandedLegalComponent implements OnInit {
  constructor() {}

  pageTitle: string = 'Is my card legal in Expanded on Pokemon TCG Live?';
  isLoading: boolean = false;
  legalityMessage!: string | null;
  legal!: boolean;
  queryCards: Card[] = [];
  myCard!: Card | undefined;

  getLegalityMessage() {}

  getLegality() {}

  ngOnInit(): void {}
}
