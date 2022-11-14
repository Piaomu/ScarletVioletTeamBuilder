import { Component, OnInit } from '@angular/core';
import { Pokemon } from './IPokemon';

@Component({
  selector: 'pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  constructor() {}
  public pageTitle = 'Pokemon Details';
  pokemon: Pokemon | undefined;
  errorMessage: string = '';

  ngOnInit(): void {}
}
