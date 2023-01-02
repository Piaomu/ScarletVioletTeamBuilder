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
  teraType: string;
  evs?: string;
  nature: Nature;
  ivs?: string;
  moves?: string[];
  photoUrl?: string;
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
