import { Injectable } from '@angular/core';
import { Pokemon } from '../pokemon/IPokemon';
import { Nature, TeamPokemon, TeraType } from '../pokemon/Iteam';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor() {}

  toProperCase(input: string): string {
    return input
      .toLowerCase()
      .split(' ')
      .map((word) => word[0].toLocaleUpperCase() + word.slice(1))
      .join(' ');
  }

  getPokepaste(teamPokemon: TeamPokemon): string {
    let pokepaste = '';

    if (teamPokemon.name) {
      pokepaste += `${teamPokemon.name} @ `;
    }
    if (teamPokemon.item) {
      pokepaste += `${teamPokemon.item}\n`;
    }
    if (teamPokemon.ability) {
      pokepaste += `Ability: ${teamPokemon.ability}\n`;
    }
    if (teamPokemon.level) {
      pokepaste += `Level: ${teamPokemon.level}\n`;
    }
    if (teamPokemon.teraType) {
      pokepaste += `Tera Type: ${teamPokemon.teraType}\n`;
    }
    if (teamPokemon.evs) {
      pokepaste += `EVs: ${teamPokemon.evs}\n`;
    }
    if (teamPokemon.nature) {
      pokepaste += `${teamPokemon.nature} Nature\n`;
    }
    if (teamPokemon.moves) {
      pokepaste += '- ' + teamPokemon.moves.join('\n- ');
    }

    return pokepaste;
  }

  displayPokepaste(team: TeamPokemon[]): string {
    let pokepaste = '';
    for (const pokemon of team) {
      pokepaste += `${this.getPokepaste(pokemon)}\n\n`;
    }
    return pokepaste;
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

  getColorByType(type: string): string {
    switch (type) {
      case 'grass':
        return '#63bb5b';
      case 'poison':
        return '#ab6ac8';
      case 'fire':
        return '#ff9c54';
      case 'water':
        return '#5a8ea1';
      case 'flying':
        return '#92aade';
      case 'normal':
        return 'beige';
      case 'electric':
        return '#f3d23b';
      case 'ice':
        return '#74cec0';
      case 'fighting':
        return '#ce4069';
      case 'ground':
        return '#d97746';
      case 'psychic':
        return '#f97176';
      case 'rock':
        return '#c7b78b';
      case 'bug':
        return '#90c12c';
      case 'dragon':
        return '#096dc4';
      case 'ghost':
        return '#5269ac';
      case 'dark':
        return '#5a5366';
      case 'steel':
        return '#5a8ea1';
      case 'fairy':
        return '#ec8fe6';
      default:
        return 'gray';
    }
  }

  getTypeIcon(types: string[] | undefined): string[] {
    let typeIcons: string[] = [];
    if (types != undefined) {
      if (types.includes('Bug')) {
        typeIcons.push('assets/TypeIcons/Pokemon_Type_Icon_Bug.png');
      }
      if (types.includes('Dark')) {
        typeIcons.push('assets/TypeIcons/Pokemon_Type_Icon_Dark.png');
      }
      if (types.includes('Dragon')) {
        typeIcons.push('assets/TypeIcons/Pokemon_Type_Icon_Dragon.png');
      }
      if (types.includes('Electric')) {
        typeIcons.push('assets/TypeIcons/Pokemon_Type_Icon_Electric.png');
      }
      if (types.includes('Fairy')) {
        typeIcons.push('assets/TypeIcons/Pokemon_Type_Icon_Fairy.png');
      }
      if (types.includes('Fighting')) {
        typeIcons.push('assets/TypeIcons/Pokemon_Type_Icon_Fighting.png');
      }
      if (types.includes('Fire')) {
        typeIcons.push('assets/TypeIcons/Pokemon_Type_Icon_Fire.png');
      }
      if (types.includes('Flying')) {
        typeIcons.push('assets/TypeIcons/Pokemon_Type_Icon_Flying.png');
      }
      if (types.includes('Ghost')) {
        typeIcons.push('assets/TypeIcons/Pokemon_Type_Icon_Ghost.png');
      }
      if (types.includes('Grass')) {
        typeIcons.push('assets/TypeIcons/Pokemon_Type_Icon_Grass.png');
      }
      if (types.includes('Ground')) {
        typeIcons.push('assets/TypeIcons/Pokemon_Type_Icon_Ground.png');
      }
      if (types.includes('Ice')) {
        typeIcons.push('assets/TypeIcons/Pokemon_Type_Icon_Ice.png');
      }
      if (types.includes('Normal')) {
        typeIcons.push('assets/TypeIcons/Pokemon_Type_Icon_Normal.png');
      }
      if (types.includes('Poison')) {
        typeIcons.push('assets/TypeIcons/Pokemon_Type_Icon_Poison.png');
      }
      if (types.includes('Psychic')) {
        typeIcons.push('assets/TypeIcons/Pokemon_Type_Icon_Psychic.png');
      }
      if (types.includes('Rock')) {
        typeIcons.push('assets/TypeIcons/Pokemon_Type_Icon_Rock.png');
      }
      if (types.includes('Steel')) {
        typeIcons.push('assets/TypeIcons/Pokemon_Type_Icon_Steel.png');
      }
      if (types.includes('Water')) {
        typeIcons.push('assets/TypeIcons/Pokemon_Type_Icon_Water.png');
      }
    }
    return typeIcons;
  }
}
