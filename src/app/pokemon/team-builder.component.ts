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
import { generate } from 'rxjs';

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

  apiPokemon1!: ApiPokemon;
  apiPokemon2!: ApiPokemon;
  apiPokemon3!: ApiPokemon;
  apiPokemon4!: ApiPokemon;
  apiPokemon5!: ApiPokemon;
  apiPokemon6!: ApiPokemon;

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

  onSubmitPokePaste(pokepaste: string) {
    this.team = this.parsePokepaste(pokepaste);
    localStorage.setItem('team', JSON.stringify(this.team));
    console.log(localStorage.getItem('team'));
  }

  onSubmitPokemon1() {
    this.pokemon1.name = this.pokemon1Form.get('name')?.value;
    this.pokemon1.gender = this.pokemon1Form.get('gender')?.value;
    this.pokemon1.item = this.pokemon1Form.get('item')?.value;
    this.pokemon1.ability = this.pokemon1Form.get('ability')?.value;
    this.pokemon1.level = this.pokemon1Form.get('level')?.value;
    this.pokemon1.teraType = this.pokemon1Form.get('teraType')?.value;
    this.pokemon1.evs = this.pokemon1Form.get('evs')?.value;
    this.pokemon1.nature = this.pokemon1Form.get('nature')?.value;
    this.pokemon1.ivs = this.pokemon1Form.get('ivs')?.value;
    this.pokemon1.moves = [
      this.pokemon1Form.get('moves.move1')?.value,
      this.pokemon1Form.get('moves.move2')?.value,
      this.pokemon1Form.get('moves.move3')?.value,
      this.pokemon1Form.get('moves.move4')?.value,
    ];
    this.pokemon1.photoUrl = this.pokemon1Form.get('photoUrl')?.value;

    localStorage.setItem('pokemon1', JSON.stringify(this.pokemon1));
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
    this.pokemon1.name = this.pokemon1Form.get('name')?.value;
    this.pokemon1.gender = this.pokemon1Form.get('gender')?.value;
    this.pokemon1.item = this.pokemon1Form.get('item')?.value;
    this.pokemon1.ability = this.pokemon1Form.get('ability')?.value;
    this.pokemon1.level = this.pokemon1Form.get('level')?.value;
    this.pokemon1.teraType = this.pokemon1Form.get('teraType')?.value;
    this.pokemon1.evs = this.pokemon1Form.get('evs')?.value;
    this.pokemon1.nature = this.pokemon1Form.get('nature')?.value;
    this.pokemon1.ivs = this.pokemon1Form.get('ivs')?.value;
    this.pokemon1.moves = [
      this.pokemon1Form.get('moves.move1')?.value,
      this.pokemon1Form.get('moves.move2')?.value,
      this.pokemon1Form.get('moves.move3')?.value,
      this.pokemon1Form.get('moves.move4')?.value,
    ];

    localStorage.setItem('pokemon1', JSON.stringify(this.pokemon1));
    console.log(this.pokemon1Form);
    console.log('Saved: ' + JSON.stringify(this.pokemon1Form.value));
  }

  savePokemon2() {
    console.log(this.pokemon2Form);
    console.log('Saved: ' + JSON.stringify(this.pokemon2Form.value));
  }

  // OnInit
  ngOnInit() {
    this.pokemon1 = {} as TeamPokemon;
    this.pokemon2 = {} as TeamPokemon;
    this.pokemon3 = {} as TeamPokemon;
    this.pokemon4 = {} as TeamPokemon;
    this.pokemon5 = {} as TeamPokemon;
    this.pokemon6 = {} as TeamPokemon;

    this.apiPokemon1 = {} as ApiPokemon;
    this.apiPokemon2 = {} as ApiPokemon;
    this.apiPokemon3 = {} as ApiPokemon;
    this.apiPokemon4 = {} as ApiPokemon;
    this.apiPokemon5 = {} as ApiPokemon;
    this.apiPokemon6 = {} as ApiPokemon;

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

    this.pokemon2Form = this.fb.group({
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

    this.pokemon3Form = this.fb.group({
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

    this.pokemon4Form = this.fb.group({
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

    this.pokemon5Form = this.fb.group({
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

    this.pokemon6Form = this.fb.group({
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
