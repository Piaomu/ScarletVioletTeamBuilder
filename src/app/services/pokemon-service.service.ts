import { Injectable } from '@angular/core';
import { Pokemon } from '../pokemon/IPokemon';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonServiceService {
  private pokemonPath = 'api/pokemon/pokemon.json';
  constructor(private httpClient: HttpClient) {}
  getPokemonList(): Observable<Pokemon[]> {
    return this.httpClient.get<Pokemon[]>(this.pokemonPath).pipe(
      tap((data) => console.log('All', JSON.stringify(data))),
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
