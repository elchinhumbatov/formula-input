import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FormulaToken } from "../types/formula";
import Dropdown from "./Dropdown";
import useFormulaStore from "../store/useFormulaStore";

// Define the item type for drag-and-drop
const ITEM_TYPE = "TAG";

interface TagProps {
  token: FormulaToken;
  index: number;
}

const Tag = ({ token, index }: TagProps) => {
  const { removeToken, updateToken, tokens, setTokens } = useFormulaStore();
  const operatorOptions = ["+", "-", "*", "/", "Remove"];
  const ref = useRef<HTMLDivElement>(null);

  // Drag hook
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Drop hook
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        const updatedTokens = [...tokens];
        const draggedToken = updatedTokens[draggedItem.index];

        updatedTokens.splice(draggedItem.index, 1);
        updatedTokens.splice(index, 0, draggedToken);

        setTokens(updatedTokens); // Update Zustand state
        draggedItem.index = index; // Update dragged index
      }
    },
  });

  // Combine drag and drop refs
  drag(drop(ref));

  const handleSelect = (option: string) => {
    switch (option) {
      case "Remove":
        removeToken(index);
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        updateToken(index, { ...token, name: option, value: option });
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={ref}
      className={`flex items-center bg-gray-500 px-2 py-1 rounded-md ${
        isDragging ? "opacity-50" : ""
      }`}
      style={{ cursor: "move" }}
    >
      <span>{token.name}</span>
      <Dropdown
        options={token.type === "operator" ? operatorOptions : ["Remove"]}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default Tag;
