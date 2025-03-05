import { create } from "zustand";
import { FormulaToken } from "../types/formula";
import { evaluate } from "mathjs";

interface FormulaState {
  tokens: FormulaToken[];
  setTokens: (newTokens: FormulaToken[]) => void;
  addToken: (token: FormulaToken) => void;
  removeToken: (index: number) => void;
  updateToken: (index: number, newToken: FormulaToken) => void;
  evaluateFormula: () => number | string;
}

const useFormulaStore = create<FormulaState>((set, get) => ({
  tokens: [],

  setTokens: (newTokens) => set({ tokens: newTokens }),
  addToken: (token) =>
    set((state) => {
      const newTokens = [...state.tokens];
      newTokens.push(token);
      return { tokens: newTokens };
    }),
  removeToken: (index) =>
    set((state) => ({
      tokens: state.tokens.filter((_, i) => i !== index),
    })),
  updateToken: (index, newToken) =>
    set((state) => ({
      tokens: state.tokens.map((t, i) =>
        i === index ? { ...t, value: newToken.value, name: newToken.name } : t
      ),
    })),

  evaluateFormula: () => {
    const { tokens } = get();
    console.log(tokens)

    // Build the formula string by replacing tags with their values
    let formula = '0';
    tokens.forEach((token) => {
      if (token.type === "variable") {
        if (typeof token.value == 'string') {
          formula += eval(token.value);
        } else {
          formula += +token.value;
        }
      } else if (token.type === "number") {
        // Add numbers directly
        formula += +token.value;
      } else {
        // Add operators or other characters
        formula += token.name;
      }
    });

    // Evaluate the formula using math.js
    try {
      const result = evaluate(formula);
      return result;
    } catch (error) {
      console.error("Error evaluating the formula:", error);
      return "Invalid Formula";
    }
  },
}));

export default useFormulaStore;
