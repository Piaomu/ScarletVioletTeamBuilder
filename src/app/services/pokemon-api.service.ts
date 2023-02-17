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
import { Move } from '../moves/Imove';
import { ApiPokemon } from '../pokemon/IApiPokemon';
import { PokemonSpecies } from '../pokemon/IApiPokemonSpecies';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private baseUrl = 'https://pokeapi.co/api/v2/';
  private pokemonUrl = this.baseUrl + 'pokemon';
  private pokemonSpeciesUrl = this.baseUrl + 'pokemon-species';
  private apiPokemon$!: Observable<ApiPokemon[]> | null;

  constructor(
    private httpClient: HttpClient,
    private utilitiesService: UtilitiesService
  ) {}

  // Pokemon Methods
  getApiPokemonByName(name: string): Observable<ApiPokemon | undefined> {
    let url = this.pokemonUrl + '/' + name;
    return this.httpClient.get<ApiPokemon>(url).pipe(
      tap((data) => console.log('Pokemon', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getApiPokemonSpeciesByName(
    name: string
  ): Observable<PokemonSpecies | undefined> {
    let url = this.pokemonSpeciesUrl + '/' + name;
    return this.httpClient.get<PokemonSpecies>(url).pipe(
      tap((data) => console.log('PokemonSpecies', JSON.stringify(data))),
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

  getApiPokemonMoveProperties(moveUrl: string): Observable<Move | undefined> {
    console.log('Attempting http request for: ' + moveUrl);
    return this.httpClient.get<Move>(moveUrl);
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
          results.forEach((result) => {
            result.name = this.utilitiesService.toProperCase(result.name);
            result.abilities.forEach((ability) => {
              ability.ability.name = this.utilitiesService.toProperCase(
                ability.ability.name
              );
            });
            result.types.forEach((type) => {
              type.type.name = this.utilitiesService.toProperCase(
                type.type.name
              );
            });
            result.moves.forEach((move) => {
              move.move.name = this.utilitiesService.toProperCase(
                move.move.name
              );
            });
          });
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

  // Pokemon Species methods
  // getPokemonSpeciesByName(name: string): Observable<PokemonSpecies | undefined>{}

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
