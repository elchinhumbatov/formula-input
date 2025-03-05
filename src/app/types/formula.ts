export type TokenType = "variable" | "number" | "operator";

export interface FormulaToken {
  id: string;
  name: string;
  value: number | string;
  type: TokenType;
}

export interface Suggestion {
  id: string;
  name: string;
  category: string;
  value: number;
}