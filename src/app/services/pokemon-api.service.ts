import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, tap, throwError } from 'rxjs';
import { ApiPokemon } from '../pokemon/IApiPokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private pokemonUrl = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private httpClient: HttpClient) {}

  // getApiPokemonList(): Observable<ApiPokemon[]> {
  //   return this.httpClient.get<ApiPokemon[]>(this.pokemonUrl).pipe(
  //     tap((data) => console.log('All', JSON.stringify(data))),
  //     catchError(this.handleError)
  //   );
  // }

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
    let requests: Observable<ApiPokemon>[] = [];
    for (let i = 1; i <= 30; i++) {
      let url = this.pokemonUrl + '/' + i;
      requests.push(this.httpClient.get<ApiPokemon>(url));
    }
    return forkJoin(requests).pipe(
      map((results) => {
        console.log(results);
        return results as ApiPokemon[];
      }),
      catchError(this.handleError)
    );
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
