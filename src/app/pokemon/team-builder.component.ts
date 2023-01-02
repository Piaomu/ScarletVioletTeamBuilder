import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Nature, Team, TeamPokemon, TeraType } from './Iteam';
import { ApiPokemon } from './IApiPokemon';
import { PokemonApiService } from '../services/pokemon-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { UtilitiesService } from '../services/utilities.service';

function natureValidator(control: FormControl): { [key: string]: any } | null {
  // Normalize the user's input
  const input = control.value.toLowerCase();

  // Iterate through the nature enum values and check if the normalized input matches any of them
  for (const nature of Object.values(Nature)) {
    if (nature.toLowerCase() === input) {
      // If the input matches a nature enum value, return null to indicate that the input is valid
      return null;
    }
  }

  // If the input does not match any of the nature enum values, return an object to indicate that the input is invalid
  return { invalidNature: true };
}

function teraTypeValidator(
  control: FormControl
): { [key: string]: any } | null {
  const input = control.value.toLowerCase();

  for (const teraType of Object.values(TeraType)) {
    if (teraType.toLowerCase() === input) {
      return null;
    }
  }
  return { invalidTeraType: true };
}

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
    private router: Router,
    private fb: FormBuilder,
    private utilityService: UtilitiesService
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
    teraType: TeraType.Grass,
    nature: Nature.Timid,
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
    let teraType: TeraType = typeLine.split(': ')[1] as TeraType;
    const [, evs] = evLine.split(': ');
    let nature: Nature = natureLine.split(' Nature')[0] as Nature;
    const [, ivs] = ivLine.split(': ');
    const moveList = moves.map((move: string) => move.trim());

    nature = nature as Nature;
    teraType = teraType as TeraType;

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

  // OnInit
  ngOnInit() {
    this.pokemon1Form = this.fb.group({
      name: ['', Validators.required],
      gender: [''],
      item: [''],
      ability: ['', Validators.required],
      level: ['50', Validators.required],
      teraType: [
        '',
        Validators.compose([Validators.required, teraTypeValidator]),
      ],
      evs: [''],
      nature: ['', Validators.compose([Validators.required, natureValidator])],
      ivs: [''],
      moves: this.fb.group({
        move1: [''],
        move2: [''],
        move3: [''],
        move4: [''],
      }),
      photoUrl: [''],
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
  // END OnInit

  properCaseInput(formControlName: string) {
    const input = this.pokemon1Form.get(formControlName)?.value;
    this.pokemon1Form
      .get(formControlName)
      ?.setValue(this.utilityService.toProperCase(input));
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
