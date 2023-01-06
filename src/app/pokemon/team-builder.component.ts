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
  ValidationErrors,
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

  apiPokemon1!: ApiPokemon | undefined;
  apiPokemon2!: ApiPokemon | undefined;
  apiPokemon3!: ApiPokemon | undefined;
  apiPokemon4!: ApiPokemon | undefined;
  apiPokemon5!: ApiPokemon | undefined;
  apiPokemon6!: ApiPokemon | undefined;

  myPokepaste!: string | null;

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
  team!: Team | null;

  onCreateTeam() {
    this.team = this.createTeam();
    console.log(this.team);
  }

  createTeam(): { name: string; pokemon: TeamPokemon[] } {
    this.team = { name: '', pokemon: [] };
    let pokemon: TeamPokemon[] = [];
    let name: string = 'myTeam';

    this.pokemon1.photoUrl =
      this.apiPokemon1?.sprites?.other?.['official-artwork']?.front_default ||
      undefined;

    this.pokemon2.photoUrl =
      this.apiPokemon2?.sprites?.other?.['official-artwork']?.front_default ||
      undefined;

    this.pokemon3.photoUrl =
      this.apiPokemon3?.sprites?.other?.['official-artwork']?.front_default ||
      undefined;

    this.pokemon4.photoUrl =
      this.apiPokemon4?.sprites?.other?.['official-artwork']?.front_default ||
      undefined;

    this.pokemon5.photoUrl =
      this.apiPokemon5?.sprites?.other?.['official-artwork']?.front_default ||
      undefined;

    this.pokemon6.photoUrl =
      this.apiPokemon6?.sprites?.other?.['official-artwork']?.front_default ||
      undefined;

    pokemon.push(this.pokemon1);
    pokemon.push(this.pokemon2);
    pokemon.push(this.pokemon3);
    pokemon.push(this.pokemon4);
    pokemon.push(this.pokemon5);
    pokemon.push(this.pokemon6);

    localStorage.setItem('team', JSON.stringify(this.team));

    return { name, pokemon };
  }

  onSubmitPokePaste(pokepaste: string) {
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

  addPokemonToTeam(pokemon: TeamPokemon): void {}

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
    this.pokemon2.name = this.pokemon2Form.get('name')?.value;
    this.pokemon2.gender = this.pokemon2Form.get('gender')?.value;
    this.pokemon2.item = this.pokemon2Form.get('item')?.value;
    this.pokemon2.ability = this.pokemon2Form.get('ability')?.value;
    this.pokemon2.level = this.pokemon2Form.get('level')?.value;
    this.pokemon2.teraType = this.pokemon2Form.get('teraType')?.value;
    this.pokemon2.evs = this.pokemon2Form.get('evs')?.value;
    this.pokemon2.nature = this.pokemon2Form.get('nature')?.value;
    this.pokemon2.ivs = this.pokemon2Form.get('ivs')?.value;
    this.pokemon2.moves = [
      this.pokemon2Form.get('moves.move1')?.value,
      this.pokemon2Form.get('moves.move2')?.value,
      this.pokemon2Form.get('moves.move3')?.value,
      this.pokemon2Form.get('moves.move4')?.value,
    ];

    localStorage.setItem('pokemon2', JSON.stringify(this.pokemon2));
    console.log(this.pokemon2Form);
    console.log('Saved: ' + JSON.stringify(this.pokemon2Form.value));
  }

  savePokemon3() {
    this.pokemon3.name = this.pokemon3Form.get('name')?.value;
    this.pokemon3.gender = this.pokemon3Form.get('gender')?.value;
    this.pokemon3.item = this.pokemon3Form.get('item')?.value;
    this.pokemon3.ability = this.pokemon3Form.get('ability')?.value;
    this.pokemon3.level = this.pokemon3Form.get('level')?.value;
    this.pokemon3.teraType = this.pokemon3Form.get('teraType')?.value;
    this.pokemon3.evs = this.pokemon3Form.get('evs')?.value;
    this.pokemon3.nature = this.pokemon3Form.get('nature')?.value;
    this.pokemon3.ivs = this.pokemon3Form.get('ivs')?.value;
    this.pokemon3.moves = [
      this.pokemon3Form.get('moves.move1')?.value,
      this.pokemon3Form.get('moves.move2')?.value,
      this.pokemon3Form.get('moves.move3')?.value,
      this.pokemon3Form.get('moves.move4')?.value,
    ];

    localStorage.setItem('pokemon3', JSON.stringify(this.pokemon3));
    console.log(this.pokemon3Form);
    console.log('Saved: ' + JSON.stringify(this.pokemon3Form.value));
  }

  savePokemon4() {
    this.pokemon4.name = this.pokemon4Form.get('name')?.value;
    this.pokemon4.gender = this.pokemon4Form.get('gender')?.value;
    this.pokemon4.item = this.pokemon4Form.get('item')?.value;
    this.pokemon4.ability = this.pokemon4Form.get('ability')?.value;
    this.pokemon4.level = this.pokemon4Form.get('level')?.value;
    this.pokemon4.teraType = this.pokemon4Form.get('teraType')?.value;
    this.pokemon4.evs = this.pokemon4Form.get('evs')?.value;
    this.pokemon4.nature = this.pokemon4Form.get('nature')?.value;
    this.pokemon4.ivs = this.pokemon4Form.get('ivs')?.value;
    this.pokemon4.moves = [
      this.pokemon4Form.get('moves.move1')?.value,
      this.pokemon4Form.get('moves.move2')?.value,
      this.pokemon4Form.get('moves.move3')?.value,
      this.pokemon4Form.get('moves.move4')?.value,
    ];

    localStorage.setItem('pokemon4', JSON.stringify(this.pokemon4));
    console.log(this.pokemon4Form);
    console.log('Saved: ' + JSON.stringify(this.pokemon4Form.value));
  }

  savePokemon5() {
    this.pokemon5.name = this.pokemon5Form.get('name')?.value;
    this.pokemon5.gender = this.pokemon5Form.get('gender')?.value;
    this.pokemon5.item = this.pokemon5Form.get('item')?.value;
    this.pokemon5.ability = this.pokemon5Form.get('ability')?.value;
    this.pokemon5.level = this.pokemon5Form.get('level')?.value;
    this.pokemon5.teraType = this.pokemon5Form.get('teraType')?.value;
    this.pokemon5.evs = this.pokemon5Form.get('evs')?.value;
    this.pokemon5.nature = this.pokemon5Form.get('nature')?.value;
    this.pokemon5.ivs = this.pokemon5Form.get('ivs')?.value;
    this.pokemon5.moves = [
      this.pokemon5Form.get('moves.move1')?.value,
      this.pokemon5Form.get('moves.move2')?.value,
      this.pokemon5Form.get('moves.move3')?.value,
      this.pokemon5Form.get('moves.move4')?.value,
    ];

    localStorage.setItem('pokemon5', JSON.stringify(this.pokemon5));
    console.log(this.pokemon5Form);
    console.log('Saved: ' + JSON.stringify(this.pokemon5Form.value));
  }

  savePokemon6() {
    this.pokemon6.name = this.pokemon6Form.get('name')?.value;
    this.pokemon6.gender = this.pokemon6Form.get('gender')?.value;
    this.pokemon6.item = this.pokemon6Form.get('item')?.value;
    this.pokemon6.ability = this.pokemon6Form.get('ability')?.value;
    this.pokemon6.level = this.pokemon6Form.get('level')?.value;
    this.pokemon6.teraType = this.pokemon6Form.get('teraType')?.value;
    this.pokemon6.evs = this.pokemon6Form.get('evs')?.value;
    this.pokemon6.nature = this.pokemon6Form.get('nature')?.value;
    this.pokemon6.ivs = this.pokemon6Form.get('ivs')?.value;
    this.pokemon6.moves = [
      this.pokemon6Form.get('moves.move1')?.value,
      this.pokemon6Form.get('moves.move2')?.value,
      this.pokemon6Form.get('moves.move3')?.value,
      this.pokemon6Form.get('moves.move4')?.value,
    ];

    localStorage.setItem('pokemon6', JSON.stringify(this.pokemon6));
    console.log(this.pokemon6Form);
    console.log('Saved: ' + JSON.stringify(this.pokemon6Form.value));
  }

  // OnInit
  ngOnInit() {
    // retrieve team from local storage if it exists
    const team: TeamPokemon[] = [];
    let allItemsExist = true;
    for (let i = 1; i <= 6; i++) {
      const item = localStorage.getItem(`pokemon${i}`);
      if (item) {
        team.push(JSON.parse(item));
      } else {
        allItemsExist = false;
        break;
      }
    }

    if (allItemsExist) {
      this.team = { name: 'team', pokemon: team };
    } else {
      const teamString = localStorage.getItem('team');
      if (teamString) {
        this.team = JSON.parse(teamString) as Team;
      } else {
        this.team = null;
      }
    }
    // generate photos for each pokemon on team
    this.team?.pokemon.forEach((pokemon) => this.generatePhotoUrl(pokemon));
    this.myPokepaste = null;
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
  }
  // END OnInit

  properCaseInput(form: FormGroup, formControlName: string) {
    const input = form.get(formControlName)?.value;
    form
      .get(formControlName)
      ?.setValue(this.utilityService.toProperCase(input));
  }

  setApiPokemon1(name?: string): void {
    this.apiPokemon1 = {} as ApiPokemon;
    if (name != null) {
      this.pokemonApiService.getApiPokemonByName(name.toLowerCase()).subscribe({
        next: (pokemon) => (this.apiPokemon1 = pokemon),
      });
      console.log(
        this.apiPokemon1?.sprites.other?.['official-artwork']?.front_default
      );
    } else {
      this.apiPokemon1 = {} as ApiPokemon;
    }
  }

  setApiPokemon2(name?: string): void {
    this.apiPokemon2 = {} as ApiPokemon;
    if (name != null) {
      this.pokemonApiService.getApiPokemonByName(name.toLowerCase()).subscribe({
        next: (pokemon) => (this.apiPokemon2 = pokemon),
      });
      console.log(
        this.apiPokemon2?.sprites.other?.['official-artwork']?.front_default
      );
    } else {
      this.apiPokemon2 = {} as ApiPokemon;
    }
  }

  setApiPokemon3(name?: string): void {
    this.apiPokemon3 = {} as ApiPokemon;
    if (name != null) {
      this.pokemonApiService.getApiPokemonByName(name.toLowerCase()).subscribe({
        next: (pokemon) => (this.apiPokemon3 = pokemon),
      });
      console.log(
        this.apiPokemon3?.sprites.other?.['official-artwork']?.front_default
      );
    } else {
      this.apiPokemon3 = {} as ApiPokemon;
    }
  }

  setApiPokemon4(name?: string): void {
    this.apiPokemon4 = {} as ApiPokemon;
    if (name != null) {
      this.pokemonApiService.getApiPokemonByName(name.toLowerCase()).subscribe({
        next: (pokemon) => (this.apiPokemon4 = pokemon),
      });
      console.log(
        this.apiPokemon4?.sprites.other?.['official-artwork']?.front_default
      );
    } else {
      this.apiPokemon4 = {} as ApiPokemon;
    }
  }

  setApiPokemon5(name?: string): void {
    this.apiPokemon5 = {} as ApiPokemon;
    if (name != null) {
      this.pokemonApiService.getApiPokemonByName(name.toLowerCase()).subscribe({
        next: (pokemon) => (this.apiPokemon5 = pokemon),
      });
      console.log(
        this.apiPokemon5?.sprites.other?.['official-artwork']?.front_default
      );
    } else {
      this.apiPokemon5 = {} as ApiPokemon;
    }
  }

  setApiPokemon6(name?: string): void {
    this.apiPokemon6 = {} as ApiPokemon;
    if (name != null) {
      this.pokemonApiService.getApiPokemonByName(name.toLowerCase()).subscribe({
        next: (pokemon) => (this.apiPokemon6 = pokemon),
      });
      console.log(
        this.apiPokemon6?.sprites.other?.['official-artwork']?.front_default
      );
    } else {
      this.apiPokemon6 = {} as ApiPokemon;
    }
  }

  // pairs the user's input with a pokemon model from PokeApi
  getApiPokemon(name: string): ApiPokemon | undefined {
    let apiPokemon: ApiPokemon | undefined;

    this.pokemonApiService.getApiPokemonByName(name).subscribe({
      next: (pokemon) => {
        if (pokemon) {
          apiPokemon = pokemon;
        }
      },
      error: (err) => {
        console.error(err);
        apiPokemon = undefined;
      },
    });

    return apiPokemon;
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
