import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Team, TeamPokemon } from './Iteam';
import { ApiPokemon } from './IApiPokemon';
import { PokemonApiService } from '../services/pokemon-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-team-builder',
  templateUrl: './team-builder.component.html',
  styleUrls: ['./team-builder.component.css'],
})
export class TeamBuilderComponent implements OnInit {
  @ViewChild('textarea') textarea: ElementRef<HTMLTextAreaElement> | undefined;
  pokemon1Form!: FormGroup; //Template will bind to this property to associate the HTML element with this FormGroup instance.
  pokemon2Form!: FormGroup;
  pokemon3Form!: FormGroup;
  pokemon4Form!: FormGroup;
  pokemon5Form!: FormGroup;
  pokemon6Form!: FormGroup;

  pokemon1!: TeamPokemon;
  pokemon2!: TeamPokemon;
  pokemon3!: TeamPokemon;
  pokemon4!: TeamPokemon;
  pokemon5!: TeamPokemon;
  pokemon6!: TeamPokemon;

  constructor(
    private pokemonApiService: PokemonApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @Input() pokepaste: string = '';

  levels = Array(100)
    .fill(0)
    .map((x, i) => i + 1);

  pokemonLevel: number = 50;
  proxyTeam: Team = { name: 'My Team', pokemon: [] };
  pokemon1proxy: TeamPokemon = {
    name: 'Pikachu',
    ability: 'Static',
    evs: '252 SpA / 4 SpD / 252 Spe',
    teraType: 'Grass',
    nature: 'Timid',
    moves: ['Thunderbolt', 'Volt Tackle', 'Hidden Power [Ice]', 'Substitute'],
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
      const parsedPokemon = this.parsePokemon(pokemonPaste);

      this.generatePhotoUrl(parsedPokemon);
      pokemon.push(parsedPokemon);
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
    const moveList = moves.map((move: string) => move.trim());

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

  generatePhotoUrl(pokemon: TeamPokemon): void {
    this.pokemonApiService
      .getApiPokemonByName(pokemon.name.toLowerCase())
      .subscribe((apiPokemon) => {
        pokemon.photoUrl =
          apiPokemon?.sprites?.other?.['official-artwork']?.front_default;
      });
  }

  savePokemon1() {
    console.log(this.pokemon1Form);
    console.log('Saved: ' + JSON.stringify(this.pokemon1Form.value));

    this.pokemon1.name = this.pokemon1Form.get('name')?.value;
    console.log('Pokemon1 name is ' + this.pokemon1.name);
  }

  savePokemon2() {
    console.log(this.pokemon2Form);
    console.log('Saved: ' + JSON.stringify(this.pokemon2Form.value));
  }

  ngOnInit() {
    this.pokemon1Form = new FormGroup({
      name: new FormControl(),
      gender: new FormControl(),
      item: new FormControl(),
      ability: new FormControl(),
      level: new FormControl('50'),
      teraType: new FormControl(),
      evs: new FormControl(),
      nature: new FormControl(),
      ivs: new FormControl(),
      moves: new FormGroup({
        move1: new FormControl(),
        move2: new FormControl(),
        move3: new FormControl(),
        move4: new FormControl(),
      }),
      photoUrl: new FormControl(),
    });

    this.pokemon2Form = new FormGroup({
      name: new FormControl(),
      gender: new FormControl(),
      item: new FormControl(),
      ability: new FormControl(),
      level: new FormControl('50'),
      teraType: new FormControl(),
      evs: new FormControl(),
      nature: new FormControl(),
      ivs: new FormControl(),
      moves: new FormGroup({
        move1: new FormControl(),
        move2: new FormControl(),
        move3: new FormControl(),
        move4: new FormControl(),
      }),
      photoUrl: new FormControl(),
    });

    this.pokemon3Form = new FormGroup({
      name: new FormControl(),
      gender: new FormControl(),
      item: new FormControl(),
      ability: new FormControl(),
      level: new FormControl('50'),
      teraType: new FormControl(),
      evs: new FormControl(),
      nature: new FormControl(),
      ivs: new FormControl(),
      moves: new FormGroup({
        move1: new FormControl(),
        move2: new FormControl(),
        move3: new FormControl(),
        move4: new FormControl(),
      }),
      photoUrl: new FormControl(),
    });

    this.pokemon4Form = new FormGroup({
      name: new FormControl(),
      gender: new FormControl(),
      item: new FormControl(),
      ability: new FormControl(),
      level: new FormControl('50'),
      teraType: new FormControl(),
      evs: new FormControl(),
      nature: new FormControl(),
      ivs: new FormControl(),
      moves: new FormGroup({
        move1: new FormControl(),
        move2: new FormControl(),
        move3: new FormControl(),
        move4: new FormControl(),
      }),
      photoUrl: new FormControl(),
    });

    this.pokemon5Form = new FormGroup({
      name: new FormControl(),
      gender: new FormControl(),
      item: new FormControl(),
      ability: new FormControl(),
      level: new FormControl('50'),
      teraType: new FormControl(),
      evs: new FormControl(),
      nature: new FormControl(),
      ivs: new FormControl(),
      moves: new FormGroup({
        move1: new FormControl(),
        move2: new FormControl(),
        move3: new FormControl(),
        move4: new FormControl(),
      }),
      photoUrl: new FormControl(),
    });

    this.pokemon6Form = new FormGroup({
      name: new FormControl(),
      gender: new FormControl(),
      item: new FormControl(),
      ability: new FormControl(),
      level: new FormControl('50'),
      teraType: new FormControl(),
      evs: new FormControl(),
      nature: new FormControl(),
      ivs: new FormControl(),
      moves: new FormGroup({
        move1: new FormControl(),
        move2: new FormControl(),
        move3: new FormControl(),
        move4: new FormControl(),
      }),
      photoUrl: new FormControl(),
    });

    // retrieve team from local storage if it exists
    if (localStorage.getItem('team') != null) {
      let teamString = localStorage.getItem('team');
      if (teamString === null) {
        this.team = null;
      } else {
        this.team = JSON.parse(teamString) as Team;
      }
    }

    // generate photos for each pokemon on team
    this.team?.pokemon.forEach((pokemon) => this.generatePhotoUrl(pokemon));

    this.proxyTeam.pokemon.push(this.pokemon1);
  }

  // Local storage methods
  localStorageIsEmpty(): boolean {
    if (localStorage.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  save() {
    // save the team object to local storage here
    localStorage.setItem('team', JSON.stringify(this.team));
  }

  clearTeam() {
    localStorage.clear();
    this.team = null;
  }
}
