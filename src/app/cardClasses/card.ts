import { IAbility } from '../cardInterfaces/ability';
import { IAncientTrait } from '../cardInterfaces/ancientTrait';
import { IAttack } from '../cardInterfaces/attack';
import { ICard } from '../cardInterfaces/card';
import { ICardImage } from '../cardInterfaces/image';
import { ICardmarket } from '../cardInterfaces/cardmarket';
import { ILegality } from '../cardInterfaces/legality';
import { IQuery } from '../cardInterfaces/query';
import { IResistance } from '../cardInterfaces/resistance';
import { ISet } from '../cardInterfaces/set';
import { ITCGPlayer } from '../cardInterfaces/tcgplayer';
import { IWeakness } from '../cardInterfaces/weakness';
import { QueryBuilder } from '../services/queryBuilder';

export class Card implements ICard {
  id!: string;
  name!: string;
  numberOfCopies: number = 0;
  supertype!: string;
  subtypes!: string[];
  hp?: string;
  types?: string[];
  evolesFrom?: string;
  evolvesTo?: string[];
  rules?: string[];
  ancientTrait?: IAncientTrait;
  abilities?: IAbility[];
  attacks?: IAttack[];
  weaknesses?: IWeakness[];
  resistances?: IResistance[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set!: ISet;
  number!: string;
  artist?: string;
  rarity!: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities!: ILegality;
  regulationMark?: string;
  images!: ICardImage;
  tcgplayer?: ITCGPlayer;
  cardmarket?: ICardmarket;
  tcgLiveLegality?: string;

  resource(): string {
    return 'cards';
  }

  /**
   * @deprecated `Card.find` is renamed to `findCardById` in version 2. See the **[migration guide](https://github.com/acupoftee/pokemon-tcg-sdk-typescript/blob/master/MIGRATING.md)** for more info.
   */
  static async find(id: string): Promise<Card> {
    return QueryBuilder.find(this, id)
      .then((response) => {
        return response;
      })
      .catch((error) => Promise.reject(error));
  }

  /**
   * @deprecated `Card.all` is renamed to `getAllCards` in version 2. See the **[migration guide](https://github.com/acupoftee/pokemon-tcg-sdk-typescript/blob/master/MIGRATING.md)** for more info.
   */
  static async all(): Promise<Card[]> {
    return QueryBuilder.all(this)
      .then((response) => {
        return response;
      })
      .catch((error) => Promise.reject(error));
  }

  /**
   * @deprecated `Card.where` is renamed to `findCardsByQueries` in version 2. See the **[migration guide](https://github.com/acupoftee/pokemon-tcg-sdk-typescript/blob/master/MIGRATING.md)** for more info.
   */
  static async where(params: IQuery[]): Promise<Card[]> {
    return QueryBuilder.where(this, params)
      .then((response) => {
        return response;
      })
      .catch((error) => Promise.reject(error));
  }
}
