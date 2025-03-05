'use client'

import { useState } from "react";
import { useAutocomplete } from "../hooks/useAutocomplete";
import { FormulaToken, Suggestion } from "../types/formula";
import Tag from "./Tag";
import useFormulaStore from "../store/useFormulaStore";

const FormulaInput = () => {
  const { tokens, addToken, removeToken, evaluateFormula } = useFormulaStore();
  const [inputValue, setInputValue] = useState("");
  const { data: suggestions } = useAutocomplete();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const newToken: FormulaToken = {
        id: crypto.randomUUID(),
        name: inputValue,  // The name is the raw input (e.g., "tag1")
        value: isNaN(Number(inputValue)) ? 0 : +inputValue,  // Convert to number or 0 if not a valid number
        type: isNaN(Number(inputValue)) ? "variable" : "number",  // Determine type (variable or number)
      };
      addToken(newToken);
      setInputValue("");
    } else if (e.key === "Backspace" && inputValue === "") {
      removeToken(tokens.length - 1);
    } else if ("+-*/^()".includes(e.key)) {
      // Add operand as a separate token
      addToken({ id: crypto.randomUUID(), name: e.key, value: e.key, type: "operator" });
      setInputValue("");
    }
  };

  const filteredSuggestions = suggestions?.filter((s: Suggestion) =>
    s.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleCalculate = () => {
    const result = evaluateFormula();
    console.log("Calculated Result: ", result);
  };

  return (
    <>
      <div className="relative border p-2 flex flex-wrap gap-2">
        {tokens.map((token, index) => (
          <Tag key={token.id} token={token} index={index} />
        ))}
        <input
          className="outline-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a formula..."
        />
        {inputValue && filteredSuggestions?.length > 0 && (
          <div className="absolute top-full left-0 mt-1 bg-black border rounded shadow-md p-2">
            {filteredSuggestions.map((suggestion: Suggestion) => (
              <div
                key={suggestion.id}
                className="p-1 cursor-pointer hover:bg-gray-500"
                onClick={() => {
                  addToken({
                    id: suggestion.id,
                    name: suggestion.name,
                    value: suggestion.value,
                    type: "variable",
                  });
                  setInputValue("");
                }}
              >
                {suggestion.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <button onClick={handleCalculate} className="mt-4 p-2 bg-blue-500 text-white">
          Calculate
        </button>
      </div>
    </>
  );
};

export default FormulaInput;