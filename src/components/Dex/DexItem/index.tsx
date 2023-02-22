import Image from "next/image";

const DexItem = ({
  name,
  id,
  img,
  onClick,
}: {
  name: string;
  id: string;
  img?: string;
  onClick: (id: string) => void;
}): JSX.Element => {
  return (
    <button
      onClick={onClick.bind(null, id)}
      className="flex pb-2 text-text-primary dark:text-text-primary-dark items-center"
    >
      {img && (
        <span className="h-full flex items-center w-[21px] mr-2">
          <Image
            src={img}
            width="21"
            height="21"
            alt={name}
            className="rounded-full bg-white"
          />
        </span>
      )}
      <span className="whitespace-nowrap h-full">{name}</span>
    </button>
  );
};

export default DexItem;
