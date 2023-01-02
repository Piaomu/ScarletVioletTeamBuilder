export interface Team {
  name: string;
  pokemon: TeamPokemon[];
}

export interface TeamPokemon {
  name: string;
  gender?: string;
  item?: string;
  ability: string;
  level?: string;
  teraType: TeraType;
  evs?: string;
  nature: Nature;
  ivs?: string;
  moves?: string[];
  photoUrl?: string;
}

export enum TeraType {
  Normal = 'Normal',
  Fighting = 'Fighting',
  Flying = 'Flying',
  Poison = 'Poison',
  Ground = 'Ground',
  Rock = 'Rock',
  Bug = 'Bug',
  Ghost = 'Ghost',
  Steel = 'Steel',
  Fire = 'Fire',
  Water = 'Water',
  Grass = 'Grass',
  Electric = 'Electric',
  Psychic = 'Psychic',
  Ice = 'Ice',
  Dragon = 'Dragon',
  Dark = 'Dark',
  Fairy = 'Fairy',
}

export enum Nature {
  Hardy = 'Hardy',
  Lonely = 'Lonely',
  Brave = 'Brave',
  Adamant = 'Adamant',
  Naughty = 'Naughty',
  Bold = 'Bold',
  Docile = 'Docile',
  Relaxed = 'Relaxed',
  Impish = 'Impish',
  Lax = 'Lax',
  Timid = 'Timid',
  Hasty = 'Hasty',
  Serious = 'Serious',
  Jolly = 'Jolly',
  Naive = 'Naive',
  Modest = 'Modest',
  Mild = 'Mild',
  Quiet = 'Quiet',
  Bashful = 'Bashful',
  Rash = 'Rash',
  Calm = 'Calm',
  Gentle = 'Gentle',
  Sassy = 'Sassy',
  Careful = 'Careful',
  Quirky = 'Quirky',
}
