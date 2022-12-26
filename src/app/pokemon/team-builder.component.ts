import { Component, Input, OnInit } from '@angular/core';
import { Team, TeamPokemon } from './Iteam';

@Component({
  selector: 'app-team-builder',
  templateUrl: './team-builder.component.html',
  styleUrls: ['./team-builder.component.css'],
})
export class TeamBuilderComponent implements OnInit {
  constructor() {}

  @Input() pokepaste: string = '';

  proxyTeam: Team = { name: 'My Team', pokemon: [] };
  pokemon1: TeamPokemon = {
    name: 'Pikachu',
    ability: 'Static',
    evs: '252 SpA / 4 SpD / 252 Spe',
    nature: 'Timid',
    moves: 'Thunderbolt, Volt Tackle, Hidden Power [Ice], Substitute',
  };
  team!: Team;

  parsePokepaste(pokepaste: string): { name: string; pokemon: TeamPokemon[] } {
    const lines = pokepaste.split('\n');
    const name = lines[0];
    const pokemon = [];

    let i = 1;
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
    const evLine = lines[2];
    const natureLine = lines[3];
    const moves = lines.slice(4);

    const [name, item] = nameLine.split(' @ ');
    const ability = abilityLine.split(': ')[1];
    const [, evs] = evLine.split(': ');
    const [nature] = natureLine.split(' Nature');
    const moveList = moves.join(', ');

    return {
      name,
      ability,
      evs,
      nature,
      moves: moveList,
      item,
    };
  }

  ngOnInit() {
    // this.team = this.parsePokepaste(this.pokepaste);
    this.proxyTeam.pokemon.push(this.pokemon1);
  }

  save() {
    // save the team object to local storage here
    localStorage.setItem('team', JSON.stringify(this.team));
  }
}
