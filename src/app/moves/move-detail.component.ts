import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonApiService } from '../services/pokemon-api.service';
import { Move } from './Imove';

@Component({
  selector: 'app-move-detail',
  templateUrl: './move-detail.component.html',
  styleUrls: ['./move-detail.component.css'],
})
export class MoveDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonApiService: PokemonApiService
  ) {}
  public move!: Move | undefined;
  errorMessage: string = '';

  getMove(name: string): void {
    this.pokemonApiService.getApiPokemonMoveProperties(name).subscribe({
      next: (move) => (this.move = move),
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    const lowerName: string =
      name?.toLocaleLowerCase() !== undefined ? name.toLowerCase() : '';

    if (name) {
      this.getMove('https://pokeapi.co/api/v2/move/' + lowerName);
    }
  }
}
