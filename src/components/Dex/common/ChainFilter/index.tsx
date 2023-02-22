import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import useDetectOutsideClick from "../../../../hooks/useDetectOutsideClick";
import ChainFilterOption from "./ChainFilterOption";
import ChainFilterButton from "./ChainFilterButton";
import ChainFilterInput from "./ChainFilterInput";

import chains from "./chains.json";

interface IChainItem {
  id: string;
  image: string;
  name: string;
}

const ChainFilter = (): JSX.Element => {
  const [inputValue, setInputValue] = useState("");

  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useDetectOutsideClick(dropdownRef, false);

  const [selectedChain, setSelectedChain] = useState<IChainItem>();
  const [data, setDate] = useState([]);

  useEffect(() => {
    setDate(chains);
    setSelectedChain(chains[0]);
  }, []);

  const handleClick = () => setIsOpen((prevState) => !prevState);

  const handleSelectChain = (tokenId: string) => {
    const selected = data.filter((item) => item.id === tokenId);

    if (selected) setSelectedChain(selected[0]);
    setIsOpen(false);
    setInputValue("");
  };

  const handleInputChange = (value) => {
    if (value) setInputValue(value.toLowerCase());
  };

  const filteredDate = data.filter((item) => {
    if (inputValue === "") return true;
    if (item.name.toLowerCase().includes(inputValue)) return true;
    return false;
  });

  return (
    <div className="relative z-[3]" ref={dropdownRef}>
      {selectedChain?.name && (
        <ChainFilterButton
          onClick={handleClick}
          name={selectedChain.name}
          image={selectedChain.image}
        />
      )}
      {isOpen && (
        <div className="absolute top-0 left-0 rounded-2xl bg-highlight dark:bg-highlight-dark w-[100vw] max-w-[21.875rem] w-full p-2.5 animate-expand-list">
          <div className="mb-4">
            <ChainFilterInput onChangeInput={handleInputChange} />
          </div>
          <ul className="flex flex-wrap justify-between max-h-[28.125rem] overflow-y-scroll">
            {filteredDate.map(({ image, name, id }) => (
              <li
                key={uuidv4()}
                className="w-[33%] flex justify-center overflow-hidden"
              >
                <ChainFilterOption
                  id={id}
                  image={image}
                  name={name}
                  isActive={id === selectedChain.id}
                  onClick={handleSelectChain}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChainFilter;
