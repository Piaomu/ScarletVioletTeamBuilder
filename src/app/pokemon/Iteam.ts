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
  nature: string;
  ivs?: string;
  moves: string;
}
