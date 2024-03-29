import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonMove } from 'pokenode-ts';
import { Observable } from 'rxjs';
import { Move } from '../moves/Imove';
import { PokemonApiService } from '../services/pokemon-api.service';
import { PokemonServiceService } from '../services/pokemon-service.service';
import { UtilitiesService } from '../services/utilities.service';
import { ApiPokemon } from './IApiPokemon';
import { Moves, Pokemon } from './IPokemon';

@Component({
  selector: 'pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonServiceService,
    private pokemonApiService: PokemonApiService,
    private utilitiesService: UtilitiesService
  ) {}
  public pageTitle = 'Pokemon Details';
  isLoading: boolean = true;
  pokemon: Pokemon | undefined;
  apiPokemon!: ApiPokemon | undefined;
  apiPokemonMoves: Move[] = [];
  total!: number | undefined;
  errorMessage: string = '';
  apiErrorMessage: string = '';
  typeIcons: string[] = [];

  getPokemon(name: string): void {
    this.pokemonService.getPokemonByName(name).subscribe({
      next: (pokemon) => (this.pokemon = pokemon),
      error: (err) => (this.errorMessage = err),
    });
  }

  getColor(type: string) {
    let color = this.utilitiesService.getColorByType(type);

    return color;
  }

  getTypeTextColor(inputColor: string) {
    let outputColor = this.utilitiesService.getTypeTextColor(inputColor);

    return outputColor;
  }

  getMoveData() {
    if (this.apiPokemonMoves.length === 0) {
      this.apiPokemon?.moves.forEach((move) => {
        this.pokemonApiService
          .getApiPokemonMoveProperties(move.move.url)
          .subscribe({
            next: (data: Move | undefined) => {
              if (typeof data === 'object' && data !== null) {
                if (
                  data.hasOwnProperty('name') &&
                  data.hasOwnProperty('accuracy') &&
                  data.hasOwnProperty('power')
                ) {
                  const propertyTypeName = this.utilitiesService.toProperCase(
                    data.type.name
                  );
                  data.imgUrl =
                    'Pokemon_Type_Icon_' + propertyTypeName + '.png';
                  this.apiPokemonMoves.push(data);
                  console.log('API POKEMON MOVES: ' + this.apiPokemonMoves);
                }
              }
            },
            error: (error) => console.error(error),
          });
      });
    }
  }

  getApiPokemon(name: string): void {
    this.pokemonApiService.getApiPokemonByName(name).subscribe({
      next: (pokemon) => (
        (this.apiPokemon = pokemon), (this.isLoading = false)
      ),
      error: (err) => ((this.errorMessage = err), (this.isLoading = false)),
    });
  }

  addToTeam(pokemonName: string) {
    console.log(`added ${pokemonName} to team!`);
  }

  hide() {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    const lowerName: string =
      name?.toLocaleLowerCase() !== undefined ? name.toLowerCase() : '';
    if (name) {
      this.getPokemon(name);
      this.getApiPokemon(lowerName);
    }

    let types: string[] | undefined = this.pokemon?.Types;
    this.typeIcons = this.utilitiesService.getTypeIcon(types);
  }
}
