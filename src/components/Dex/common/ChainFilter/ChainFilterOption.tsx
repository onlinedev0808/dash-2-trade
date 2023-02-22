import Image from "next/image";

interface IChainOption {
  id: string;
  image: string;
  name: string;
  isActive?: boolean;
  onClick: (item) => void;
}

const ChainFilterOption = ({
  id,
  name,
  image,
  isActive,
  onClick,
}: IChainOption): JSX.Element => {
  return (
    <button
      onClick={onClick.bind(null, id)}
      className={`flex flex-col items-center justify-center text-sm py-3 hover:bg-navigation-background hover:dark:bg-navigation-background-dark w-full rounded ${
        isActive
          ? "bg-navigation-background dark:bg-navigation-background-dark"
          : ""
      }`}
    >
      <Image src={image} width="23" height="23" />
      <span className="uppercase pt-2">{name}</span>
    </button>
  );
};

export default ChainFilterOption;
