import { FormulaToken } from "../types/formula";
import Dropdown from "./Dropdown";
import useFormulaStore from "../store/useFormulaStore";


interface TagProps {
  token: FormulaToken;
  index: number;
}

const Tag = ({ token, index }: TagProps) => {
  const { removeToken, updateToken } = useFormulaStore();
  const operatorOptions = ['+', '-', '*', '/', 'Remove']
  console.log(token)

  const handleSelect = (option: string) => {
    switch (option) {
      case "Remove":
        removeToken(index);
        break;
      case "+":
        updateToken(index, {...token, name: '+', value: '+'});
        break;
      case "-":
        updateToken(index, {...token, name: '-', value: '-'});
        break;
      case "*":
        updateToken(index, {...token, name: '*', value: '*'});
        break;
      case "/":
        updateToken(index, {...token, name: '/', value: '/'});
        break;
    
      default:
        break;
    }
  };
  return (
    <div className="flex items-center bg-gray-500 px-2 py-1 rounded-md">
      <span>{token.name}</span>
      <Dropdown options={token.type == 'operator' ? operatorOptions : ["Remove"]} onSelect={handleSelect} />
    </div>
  );
};

export default Tag;
