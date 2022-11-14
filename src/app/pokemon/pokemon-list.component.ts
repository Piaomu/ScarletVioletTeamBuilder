import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from './IPokemon';
import { Subscription } from 'rxjs';
import { PokemonServiceService } from '../services/pokemon-service.service';

@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  constructor(private pokemonService: PokemonServiceService) {}

  pageTitle = 'All Pokemon';
  iconHeight = 50;
  iconWidth = 50;
  pokemon: Pokemon[] = [];
  filteredPokemon: Pokemon[] = [];
  errorMessage: string = '';
  sub!: Subscription;
  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter:', value);
    this.filteredPokemon = this.performFilter(value);
  }

  performFilter(filterBy: string): Pokemon[] {
    filterBy = filterBy.toLocaleLowerCase();

    return this.pokemon.filter((onePokemon: Pokemon) =>
      onePokemon.Name.toLocaleLowerCase().includes(filterBy)
    );
  }

  filterByType(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    this.filteredPokemon = this.pokemon.filter((pokemon: Pokemon) =>
      pokemon.Types.map((element) => element.toLocaleLowerCase()).includes(
        filterBy
      )
    );
  }

  addToTeam(pokemonName: string) {
    console.log(`added ${pokemonName} to team!`);
  }

  ngOnInit(): void {
    this.sub = this.pokemonService.getPokemonList().subscribe({
      next: (pokemon) => {
        this.pokemon = pokemon;
        this.filteredPokemon = pokemon;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
