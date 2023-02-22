import { useRef } from "react";

const ChainFilterInput = ({
  onChangeInput,
}: {
  onChangeInput: (value) => void;
}) => {
  const inputRef = useRef(null);

  const handleInputChange = () => onChangeInput(inputRef?.current?.value);

  return (
    <input
      type="text"
      name="chain"
      onChange={handleInputChange}
      placeholder="Search"
      className="text-text-primary dark:text-text-primary-dark bg-foreground dark:bg-foreground-dark px-2 py-1 mb-1 mt-2 rounded-lg shadow-lg border-1 w-full border-border-primary"
      ref={inputRef}
    />
  );
};

export default ChainFilterInput;
