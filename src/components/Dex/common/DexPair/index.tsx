import Image from "next/image";
import { DexSvg } from "../../../CommonSvg";

const DexPair = ({
  fistDex,
  secondDex,
  img,
}: {
  fistDex: string;
  secondDex: string;
  img?: string;
}): JSX.Element => (
  <div className="relative">
    <div className="w-[34px] h-[34px] rounded-[50%] bg-[#D9D9D9] text-black flex items-center justify-center">
      {secondDex.at(0)}
    </div>
    <div className="absolute top-0 left-0 translate-x-[100%] translate-y-[-20%]">
      {/*<DexSvg name={fistDex} />*/}
      {img && (
        <Image
          src={img}
          height={21}
          width={21}
          className="rounded-full bg-white"
          alt="token icon"
        />
      )}
    </div>
  </div>
);

export default DexPair;
