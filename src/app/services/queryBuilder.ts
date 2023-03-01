import { Client } from './pokemon-tcg-service';
import { Card } from '../cardClasses/card';
import { Set } from '../cardClasses/set';
import { IQuery } from '../cardInterfaces/query';

export class QueryBuilder {
  static all<T extends Card | Set>(type: { new (): T }): Promise<T[]> {
    const t = new type();
    const params: IQuery[] = [
      {
        name: 'pageSize',
        value: 250,
      },
    ];

    return Client.get(t.resource(), params);
  }

  static find<T extends Card | Set>(
    type: { new (): T },
    id: string
  ): Promise<T> {
    const t = new type();

    return Client.get(t.resource(), id);
  }

  static where<T extends Card | Set>(
    type: { new (): T },
    params: IQuery[]
  ): Promise<T[]> {
    const t = new type();

    return Client.get(t.resource(), params);
  }
}
