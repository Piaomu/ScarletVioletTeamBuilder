import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from './IPokemon';
import { Subscription } from 'rxjs';
import { PokemonServiceService } from '../services/pokemon-service.service';
import { PokemonApiService } from '../services/pokemon-api.service';
import { ApiPokemon } from './IApiPokemon';
import { saveAs } from 'file-saver';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  constructor(
    private pokemonService: PokemonServiceService,
    private pokemonApiService: PokemonApiService,
    private utilityService: UtilitiesService
  ) {}

  pageTitle = 'All Pokemon';
  isLoading: boolean = true;
  iconHeight = 50;
  iconWidth = 50;
  pokemon: Pokemon[] = [];
  filteredPokemon: Pokemon[] = [];
  apiPokemon: ApiPokemon[] = [];
  filteredApiPokemon: ApiPokemon[] = [];

  errorMessage: string = '';
  sub!: Subscription;
  apiSub!: Subscription;
  private _listFilter: string = '';
  private _listApiPokemonFilter: string = '';

  get listFilter(): string {
    return this._listFilter;
  }

  get listApiPokemonFilter(): string {
    return this._listApiPokemonFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter:', value);
    this.filteredPokemon = this.performFilter(value);
  }

  set listApiPokemonFilter(value: string) {
    this._listApiPokemonFilter = value;
    console.log('In setter:', value);
    this.filteredApiPokemon = this.performApiPokemonFilter(value);
  }

  performFilter(filterBy: string): Pokemon[] {
    filterBy = filterBy.toLocaleLowerCase();

    return this.pokemon.filter((onePokemon: Pokemon) =>
      onePokemon.Name.toLocaleLowerCase().includes(filterBy)
    );
  }

  performApiPokemonFilter(filterBy: string): ApiPokemon[] {
    filterBy = filterBy.toLocaleLowerCase();

    return this.apiPokemon.filter((onePokemon: ApiPokemon) =>
      onePokemon.name.toLocaleLowerCase().includes(filterBy)
    );
  }

  filterByType(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    this.filteredApiPokemon = this.apiPokemon.filter((pokemon: ApiPokemon) =>
      pokemon.types
        .map((element) => element.type.name.toLocaleLowerCase())
        .includes(filterBy)
    );
  }

  addToTeam(pokemonName: string) {
    console.log(`added ${pokemonName} to team!`);
  }

  getColor(type: string) {
    let color = this.utilityService.getColorByType(type);

    return color;
  }

  saveToJsonFile() {
    const jsonData = JSON.stringify(this.apiPokemon);
    const blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, 'apiPokemon.json');
  }

  ngOnInit(): void {
    this.sub = this.pokemonService.getPokemonList().subscribe({
      next: (pokemon) => {
        this.pokemon = pokemon;
        this.filteredPokemon = pokemon;
      },
      error: (err) => ((this.errorMessage = err), (this.isLoading = false)),
    });

    this.apiSub = this.pokemonApiService.getApiPokemonList().subscribe({
      next: (data) => {
        this.apiPokemon = data;
        this.filteredApiPokemon = data;
        this.isLoading = false;
      },
      error: (err) => console.log(err),
    });

    console.log('API POKEMON ARE: ' + this.apiPokemon);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.apiSub.unsubscribe();
  }
}
