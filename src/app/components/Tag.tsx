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
  const { removeToken, updateToken } = useFormulaStore();
  const operatorOptions = ["+", "-", "*", "/", "Remove"];

  // Drag hook
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id: token.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Drop hook
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (item: { id: string; index: number }) => {
      if (item.index !== index) {
        // Reorder the tokens when dropped at a different index
        const currentTokens = [...useFormulaStore.getState().tokens];
        const draggedToken = currentTokens[item.index];
        currentTokens.splice(item.index, 1);
        currentTokens.splice(index, 0, draggedToken);

        // Update store with new token order
        useFormulaStore.getState().setTokens(currentTokens);
      }
    },
  });

  const handleSelect = (option: string) => {
    switch (option) {
      case "Remove":
        removeToken(index);
        break;
      case "+":
        updateToken(index, { ...token, name: "+", value: "+" });
        break;
      case "-":
        updateToken(index, { ...token, name: "-", value: "-" });
        break;
      case "*":
        updateToken(index, { ...token, name: "*", value: "*" });
        break;
      case "/":
        updateToken(index, { ...token, name: "/", value: "/" });
        break;

      default:
        break;
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`flex items-center bg-gray-500 px-2 py-1 rounded-md ${isDragging ? "opacity-50" : ""}`}
      style={{ cursor: "move" }}
    >
      <span>{token.name}</span>
      <Dropdown options={token.type === "operator" ? operatorOptions : ["Remove"]} onSelect={handleSelect} />
    </div>
  );
};

export default Tag;


// import { FormulaToken } from "../types/formula";
// import Dropdown from "./Dropdown";
// import useFormulaStore from "../store/useFormulaStore";


// interface TagProps {
//   token: FormulaToken;
//   index: number;
// }

// const Tag = ({ token, index }: TagProps) => {
//   const { removeToken, updateToken } = useFormulaStore();
//   const operatorOptions = ['+', '-', '*', '/', 'Remove']
//   console.log(token)

//   const handleSelect = (option: string) => {
//     switch (option) {
//       case "Remove":
//         removeToken(index);
//         break;
//       case "+":
//         updateToken(index, {...token, name: '+', value: '+'});
//         break;
//       case "-":
//         updateToken(index, {...token, name: '-', value: '-'});
//         break;
//       case "*":
//         updateToken(index, {...token, name: '*', value: '*'});
//         break;
//       case "/":
//         updateToken(index, {...token, name: '/', value: '/'});
//         break;
    
//       default:
//         break;
//     }
//   };
//   return (
//     <div className="flex items-center bg-gray-500 px-2 py-1 rounded-md">
//       <span>{token.name}</span>
//       <Dropdown options={token.type == 'operator' ? operatorOptions : ["Remove"]} onSelect={handleSelect} />
//     </div>
//   );
// };

// export default Tag;
