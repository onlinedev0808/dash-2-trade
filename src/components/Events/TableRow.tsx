import Image from "next/image";
import moment from "moment";

const TableRow = ({ row }) => {
  const { logo, date, time, event } = row;

  return (
    <div className="h-[3.2rem] flex items-center hover:bg-highlight dark:hover:bg-highlight-dark border-b-1 border-separator">
      <div className="w-[10%] ml-0.5 text-sm leading-4 text-text-primary dark:text-text-primary-dark flex align-middle">
        <Image
          src={logo}
          height={30}
          width={30}
          className="rounded-full"
          alt="token icon"
        />
      </div>
      <div className="w-[15%] ml-6 text-sm leading-4 text-text-primary dark:text-text-primary-dark">
        {moment(date).format("YYYY-MM-DD")}
      </div>
      <div className="w-[15%] ml-6 text-sm leading-4 text-text-primary dark:text-text-primary-dark">
        {time}
      </div>
      <div className="w-[85%] flex gap-2 items-center">
        <span className="bg-[#FBFBFB] text-black p-1 px-3 rounded-md">
          {event.token}
        </span>
        <span className="text-text-primary dark:text-text-primary-dark">
          {event.phrase1 || ""}
        </span>
        <span className="bg-[#89898B] text-text-primary dark:text-text-primary-dark p-1 px-3 rounded-md">
          {event.metric}
        </span>
        <span className="text-text-primary dark:text-text-primary-dark">
          {event.phrase2 || ""}
        </span>
      </div>
    </div>
  );
};

export default TableRow;
