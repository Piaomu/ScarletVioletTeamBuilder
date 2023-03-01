import * as axios from 'axios';
import { API_URL, API_VERSION } from './pokemon-tcg-sdk';
import { IQuery } from '../cardInterfaces/query';

export class Client {
  static apiUrl: string = `${API_URL}/v${API_VERSION}`;

  static async get(resource: string, params?: IQuery[] | string): Promise<any> {
    let url: string = `${this.apiUrl}/${resource}`;
    const POKEMONTCG_API_KEY = 'b768d2e1-4f2f-45b7-815c-bbfbb0681320';
    const config: axios.AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (POKEMONTCG_API_KEY) {
      config.headers['X-Api-Key'] = POKEMONTCG_API_KEY;
    }

    if (typeof params === 'string') url += `/${params}`;
    else url += `?${this.paramsToQuery(params)}`;

    return axios.default
      .get<any>(url, config)
      .then((response) => {
        return response.data[Object.keys(response.data)[0]];
      })
      .catch((error) => Promise.reject(error));
  }

  private static paramsToQuery(params?: IQuery[]): string {
    let query: string = '';

    if (params) {
      params.map((q: IQuery) => {
        query += `${q.name}=${encodeURIComponent(q.value.toString())}`.concat(
          '&'
        );
      });
    }

    return query;
  }
}
