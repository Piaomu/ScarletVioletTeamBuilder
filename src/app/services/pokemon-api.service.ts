import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ApiPokemon } from '../pokemon/IApiPokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private pokemonUrl = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private httpClient: HttpClient) {}

  getApiPokemonByName(name: string): Observable<ApiPokemon | undefined> {
    let url = this.pokemonUrl + '/' + name;
    return this.httpClient.get<ApiPokemon>(url).pipe(
      tap((data) => console.log('Pokemon', JSON.stringify(data))),
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
