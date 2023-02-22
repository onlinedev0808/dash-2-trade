import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const ChainFilterButton = ({
  image,
  name,
  onClick,
}: {
  image: string;
  name: string;
  onClick: () => void;
}): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className="bg-highlight dark:bg-highlight-dark rounded-2xl text-sm py-2 px-3 flex items-center"
    >
      <Image src={image} width="23" height="23" />
      <span className="uppercase pl-2">{name}</span>
      <FontAwesomeIcon
        icon={faAngleDown}
        className="h-3 w-3 text-text-primary dark:text-text-primary-dark pl-3"
      />
    </button>
  );
};

export default ChainFilterButton;
