import { useState } from "react";

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

const Dropdown = ({ options, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ml-2 bg-black px-2 py-1 rounded"
      >
        ⬇
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-1 bg-black border shadow-md rounded">
          {options.map((option, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-500 cursor-pointer"
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
