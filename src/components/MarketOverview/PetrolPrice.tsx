import { PetrolSvg } from "../CommonSvg";

const PetrolPrice = ({ price }) => (
  <div className="h-[100%] px-3 py-3 bg-button-primary rounded rounded-l-none text-center text-sm">
    <div className="flex gap-x-1 align-center">
      <PetrolSvg />
      <span>{price}</span>
    </div>
  </div>
);

export default PetrolPrice;
