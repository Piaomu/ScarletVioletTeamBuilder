export interface Pokemon {
  Name: string;
  Stats: Stats;
  Types: string[];
  Abilities: string[];
  Evolutions: Evolutions | null;
  Moves: Moves;
}

export interface Stats {
  Hp: number;
  Atk: number;
  Def: number;
  SpAtk: number;
  SpDef: number;
  Spd: number;
  Total: number;
}

export interface Evolutions {
  Level: number | null;
  Condition: string | null;
  Parameters: string | null;
  Species: string | null;
  Form: number | null;
}

export interface Moves {
  LearnedMoves: LearnedMoves | null;
  EggMoves: string[] | null;
  TmMoves: string[] | null;
}

export interface LearnedMoves {
  MovesLevels: { [key: string]: string };
}
