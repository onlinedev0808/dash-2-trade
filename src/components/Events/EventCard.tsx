const Tag = ({ content, sentiment }) => {
  switch (sentiment) {
    case "bearish":
      return (
        <div className="text-base px-5 rounded-full bg-red-300 text-red-900 w-fit">
          <p>{content}</p>
        </div>
      );
    case "bullish":
      return (
        <div className="text-base px-5 rounded-full bg-[#1EE0AC] text-green-900 w-fit">
          <p>{content}</p>
        </div>
      );
    case "neutral":
      return (
        <div className="text-base px-5 rounded-full bg-slate-300 text-slate-800 w-fit">
          <p>{content}</p>
        </div>
      );
  }
};

const EventCard = ({ tags, description }) => (
  <div className="flex flex-row bg-[#121318] lg:w-[600px] w-full p-5 lg:gap-10 gap-3 rounded cursor-pointer">
    <div className="flex flex-col pr-5 border-r border-white/50">
      <p className="text-lg">15</p>
      <p className="mx-auto text-lg">Jun</p>
    </div>
    <div className="flex flex-col h-fill justify-between gap-5 py-2">
      <div className="flex lg:gap-5 gap-2 flex-wrap">
        <Tag
          content={
            description ==
            "BTC volume was 10% above the 4 week moving averages, the first time this happened in 4 months."
              ? "Bullish"
              : "Bearish"
          }
          sentiment={
            description ==
            "BTC volume was 10% above the 4 week moving averages, the first time this happened in 4 months."
              ? "bullish"
              : "bearish"
          }
        />
        {tags.map((item) => (
          <Tag content={item} key={item.id} sentiment="neutral" />
        ))}
      </div>

      <p className="text-text-secondary dark:text-text-secondary-dark">
        {description}
      </p>
    </div>
  </div>
);

export default EventCard;
