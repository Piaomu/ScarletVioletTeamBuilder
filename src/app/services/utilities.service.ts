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

    pokepaste += `${teamPokemon.name} @ ${teamPokemon.item}\n`;
    pokepaste += `Ability: ${teamPokemon.ability}\n`;
    pokepaste += `Level: ${teamPokemon.level}\n`;
    pokepaste += `Tera Type: ${teamPokemon.teraType}\n`;
    pokepaste += `EVs: ${teamPokemon.evs}\n`;
    pokepaste += `${teamPokemon.nature} Nature\n`;
    pokepaste += '- ' + teamPokemon.moves?.join('\n- ');

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
