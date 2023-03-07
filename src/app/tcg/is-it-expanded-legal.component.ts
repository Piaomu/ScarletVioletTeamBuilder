import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Card } from '../cardClasses/card';
import { Legality } from '../cardInterfaces/legality';
import { IQuery } from '../cardInterfaces/query';

// needed to initialize tooltips
declare var bootstrap: any;

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
  legality!: string;
  queryCards: Card[] = [];
  myCard!: Card | undefined;
  queryFormControl = new FormControl();

  async getCardsByQuery() {
    this.isLoading = true;
    this.queryExecuted = false;
    const query: IQuery[] = [
      { name: 'q', value: `name:"${this.queryFormControl.value}"` },
    ];
    this.queryCards = await Card.where(query);
    this.isLoading = false;
    this.queryExecuted = true;
    console.log('Searching for: ' + query.at(0)?.name + query.at(0)?.value);
  }
  getLegalityMessage() {}

  getLegality(card: Card) {
    console.log('Card: ' + card.name);
    if (card.legalities.expanded !== Legality.LEGAL) {
      card.tcgLiveLegality = 'Banned';
      console.log('Legality for' + card.name + ': ' + card.tcgLiveLegality);
    } else if (
      card.legalities.expanded === Legality.LEGAL &&
      (card.set.series === 'XY' || card.set.series === 'Black & White')
    ) {
      card.tcgLiveLegality = 'Banned';
      console.log('Legality for' + card.name + ': ' + card.tcgLiveLegality);
    } else {
      card.tcgLiveLegality = 'Legal';
      console.log('Legality for' + card.name + ': ' + card.tcgLiveLegality);
    }
  }

  removeLegality(card: Card) {
    card.tcgLiveLegality = '';
  }

  ngOnInit(): void {
    this.queryFormControl.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.getCardsByQuery();
    });

    //initialize tooltips
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
}
