import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  pokemon: Pokemon | undefined;
  apiPokemon: ApiPokemon | undefined;
  errorMessage: string = '';
  apiErrorMessage: string = '';
  typeIcons: string[] = [];

  getPokemon(name: string): void {
    this.pokemonService.getPokemonByName(name).subscribe({
      next: (pokemon) => (this.pokemon = pokemon),
      error: (err) => (this.errorMessage = err),
    });
  }

  getApiPokemon(name: string): void {
    this.pokemonApiService.getApiPokemonByName(name).subscribe({
      next: (pokemon) => (this.apiPokemon = pokemon),
      error: (err) => (this.errorMessage = err),
    });
  }
  addToTeam(pokemonName: string) {
    console.log(`added ${pokemonName} to team!`);
  }
  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    const lowerName: string =
      name?.toLocaleLowerCase() !== undefined ? name.toLowerCase() : '';
    if (name) {
      this.getPokemon(name);
      this.getApiPokemon(lowerName);
    }
    let types: string[] | undefined = this.pokemon?.Types;

    const fire: string[] = ['Fire', 'Water', 'Grass'];

    this.typeIcons = this.utilitiesService.getTypeIcon(types);
  }
}
