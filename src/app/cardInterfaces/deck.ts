import { Card } from '../cardClasses/card';
import { ILegality } from '../cardInterfaces/legality';

export interface IDeck {
  id: string;
  name: string;
  price: number | null;
  cards: Card[];
  legality: ILegality | undefined;
}

export interface IDeckPrice {
  low: number | null;
  mid: number | null;
  high: number | null;
  market: number | null;
}
