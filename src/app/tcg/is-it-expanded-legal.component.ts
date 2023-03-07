import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Card } from '../cardClasses/card';
import { IQuery } from '../cardInterfaces/query';

@Component({
  selector: 'is-it-expanded-legal',
  templateUrl: './is-it-expanded-legal.component.html',
  styleUrls: ['./is-it-expanded-legal.component.css'],
})
export class IsItExpandedLegalComponent implements OnInit {
  constructor() {}

  pageTitle: string = 'Is my card legal in Expanded on Pokemon TCG Live?';
  isLoading: boolean = false;
  queryExecuted: boolean = false;
  legalityMessage!: string | null;
  legal!: boolean;
  queryCards: Card[] = [];
  myCard!: Card | undefined;
  queryFormControl = new FormControl();

  async getCardsByQuery() {
    this.isLoading = true;
    const query: IQuery[] = [
      { name: 'q', value: 'name:' + this.queryFormControl.value },
    ];
    this.queryCards = await Card.where(query);
    this.isLoading = false;
    this.queryExecuted = true;
    console.log('Searching for: ' + query.at(0)?.name + query.at(0)?.value);
  }
  getLegalityMessage() {}

  getLegality() {}

  ngOnInit(): void {
    this.queryFormControl.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.getCardsByQuery();
    });
  }
}
