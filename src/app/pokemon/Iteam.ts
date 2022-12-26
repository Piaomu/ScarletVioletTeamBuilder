export interface Team {
  name: string;
  pokemon: TeamPokemon[];
}

export interface TeamPokemon {
  name: string;
  ability: string;
  evs: string;
  nature: string;
  moves: string;
  item?: string;
}
