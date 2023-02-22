import { ArrowUp, DailyGainersSvg } from "../../CommonSvg";

const ITEMS = [
  {
    id: 1,
    longName: "Matura Universe",
    shortName: "MAU",
    gain: "+3%",
    price: 1327,
    icon: "mau",
  },
  {
    id: 2,
    longName: "Avalon GFX",
    shortName: "GFX",
    gain: "+1%",
    price: 19041,
    icon: "gfx",
  },
  {
    id: 3,
    longName: "Drop box",
    shortName: "BOX",
    gain: "+3%",
    price: 1327,
    icon: "box",
  },
  {
    id: 4,
    longName: "Deep AI",
    shortName: "DEEP",
    gain: "+1%",
    price: 1327,
    icon: "deep",
  },
  {
    id: 5,
    longName: "Share Network",
    shortName: "SHR",
    gain: "+1%",
    price: 19041,
    icon: "shr",
  },
];

const DailyGainers = () => (
  <div className="h-full">
    <div className="flex justify-between mb-1">
      <div className="flex gap-x-3">
        <div className="self-center h-[1.5rem] w-[1.5rem] bg-grey rounded-full flex align-end justify-center">
          <ArrowUp color={undefined} />
        </div>

        <h3 className="text-green">Daily Gainers</h3>
      </div>

      <h6 className="text-text-secondary dark:text-text-secondary-dark text-base">
        Price
      </h6>
    </div>

    {ITEMS.map((item) => (
      <div
        key={item.id}
        className="grid grid-cols-[1fr_0.5fr] align-center py-3 gap-x-3 justify-between"
      >
        <div className="flex gap-x-3">
          {/* <Image
            width={24}
            height={24}
            src={item.icon}
            alt={item.longName}
            layout="fixed"
          /> */}
          <div className="w-[23px] h-[20px]">
            <DailyGainersSvg name={item.icon} />
          </div>
          <div className="flex gap-x-3">
            <span className="text-text-primary dark:text-text-primary-dark text-sm">
              {item.longName}
            </span>
            <span className="text-text-secondary dark:text-text-secondary-dark text-sm">
              {item.shortName}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 text-right text-sm">
          <span
            className={`${item.gain[0] === "+" ? "text-green" : "text-red"}`}
          >
            {item.gain}
          </span>
          <span className="text-text-primary dark:text-text-primary-dark text-sm">
            ${item.price}
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default DailyGainers;
