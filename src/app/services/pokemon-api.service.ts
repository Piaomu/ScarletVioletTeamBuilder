import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  forkJoin,
  map,
  Observable,
  shareReplay,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { ApiPokemon } from '../pokemon/IApiPokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private pokemonUrl = 'https://pokeapi.co/api/v2/pokemon';
  private apiPokemon$!: Observable<ApiPokemon[]> | null;

  constructor(private httpClient: HttpClient) {}

  getApiPokemonByName(name: string): Observable<ApiPokemon | undefined> {
    let url = this.pokemonUrl + '/' + name;
    return this.httpClient.get<ApiPokemon>(url).pipe(
      tap((data) => console.log('Pokemon', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getApiPokemonByNumber(number: number): Observable<ApiPokemon | undefined> {
    let url = this.pokemonUrl + '/' + number;
    return this.httpClient.get<ApiPokemon>(url).pipe(
      tap((data) => console.log('Pokemon', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getApiPokemonList(): Observable<ApiPokemon[]> {
    if (!this.apiPokemon$) {
      let requests: Observable<ApiPokemon>[] = [];
      for (let i = 1; i <= 1008; i++) {
        let url = this.pokemonUrl + '/' + i;

        // Create an array of requests, one for each Pokemon in the dex
        requests.push(this.httpClient.get<ApiPokemon>(url));
      }
      // Perform all requests simultaneously and add the ApiPokemon from each to an array
      this.apiPokemon$ = forkJoin(requests).pipe(
        map((results) => {
          console.log(results);
          return results as ApiPokemon[];
        }),
        // cache the results of hella requests
        shareReplay(1),
        catchError(this.handleError)
      );

      // Resets the cache after 1 hour
      timer(3600000).subscribe(() => (this.apiPokemon$ = null));
    }
    return this.apiPokemon$;
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
