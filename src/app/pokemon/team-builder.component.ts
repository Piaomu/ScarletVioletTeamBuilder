import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Team, TeamPokemon } from './Iteam';
import { ApiPokemon } from './IApiPokemon';
import { PokemonApiService } from '../services/pokemon-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team-builder',
  templateUrl: './team-builder.component.html',
  styleUrls: ['./team-builder.component.css'],
})
export class TeamBuilderComponent implements OnInit {
  @ViewChild('textarea') textarea: ElementRef<HTMLTextAreaElement> | undefined;

  constructor(
    private pokemonApiService: PokemonApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @Input() pokepaste: string = '';

  proxyTeam: Team = { name: 'My Team', pokemon: [] };
  pokemon1: TeamPokemon = {
    name: 'Pikachu',
    ability: 'Static',
    evs: '252 SpA / 4 SpD / 252 Spe',
    teraType: 'Grass',
    nature: 'Timid',
    moves: 'Thunderbolt, Volt Tackle, Hidden Power [Ice], Substitute',
  };
  team!: Team | null;

  onSubmit(pokepaste: string) {
    this.team = this.parsePokepaste(pokepaste);
    localStorage.setItem('team', JSON.stringify(this.team));
    console.log(localStorage.getItem('team'));
  }

  editPokemon(_t13: TeamPokemon) {
    throw new Error('Method not implemented.');
  }

  parsePokepaste(pokepaste: string): { name: string; pokemon: TeamPokemon[] } {
    const lines = pokepaste.split('\n');
    const name = lines[0];
    const pokemon = [];

    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (!line) {
        i++;
        continue;
      }

      const pokemonLines = [];
      while (i < lines.length && lines[i]) {
        pokemonLines.push(lines[i]);
        i++;
      }

      const pokemonPaste = pokemonLines.join('\n');
      pokemon.push(this.parsePokemon(pokemonPaste));
    }

    return { name, pokemon };
  }

  parsePokemon(pokepaste: string): TeamPokemon {
    const lines = pokepaste.split('\n');
    const nameLine = lines[0];
    const abilityLine = lines[1];
    const levelLine = lines[2];
    const typeLine = lines[3];
    const evLine = lines[4];
    const natureLine = lines[5];
    const ivLine = lines[6];
    const moves = lines.slice(7);

    const [name, item] = nameLine.split(' @ ');
    const ability = abilityLine.split(': ')[1];
    const level = levelLine.split(': ')[1];
    const teraType = typeLine.split(': ')[1];
    const [, evs] = evLine.split(': ');
    const [nature] = natureLine.split(' Nature');
    const [, ivs] = ivLine.split(': ');
    const moveList = moves.join(', ');

    return {
      name,
      ability,
      level,
      teraType,
      evs,
      nature,
      moves: moveList,
      ivs,
      item,
    };
  }

  generatePhotoUrl(name: string): void {
    let apiPokemon = this.pokemonApiService.getApiPokemonByName(
      name.toLowerCase()
    );
  }

  ngOnInit() {
    if (localStorage.getItem('team') != null) {
      let teamString = localStorage.getItem('team');
      if (teamString === null) {
        this.team = null;
      } else {
        this.team = JSON.parse(teamString) as Team;
      }
    }

    this.team?.pokemon.forEach((pokemon) =>
      this.generatePhotoUrl(pokemon.name)
    );
    this.proxyTeam.pokemon.push(this.pokemon1);
  }

  save() {
    // save the team object to local storage here
    localStorage.setItem('team', JSON.stringify(this.team));
  }
}
