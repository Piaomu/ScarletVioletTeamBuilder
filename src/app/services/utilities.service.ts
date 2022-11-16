import { Injectable } from '@angular/core';
import { Pokemon } from '../pokemon/IPokemon';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor() {}

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
