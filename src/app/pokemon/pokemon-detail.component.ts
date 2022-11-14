import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonServiceService } from '../services/pokemon-service.service';
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
    private pokemonService: PokemonServiceService
  ) {}
  public pageTitle = 'Pokemon Details';
  pokemon: Pokemon | undefined;
  errorMessage: string = '';

  getPokemon(name: string): void {
    this.pokemonService.getPokemonByName(name).subscribe({
      next: (pokemon) => (this.pokemon = pokemon),
      error: (err) => (this.errorMessage = err),
    });
  }
  addToTeam(pokemonName: string) {
    console.log(`added ${pokemonName} to team!`);
  }
  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.getPokemon(name);
    }
  }
}
