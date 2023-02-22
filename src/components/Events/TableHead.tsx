const TableHead = () => (
  <div className="h-[3.2rem] flex items-center text-sm leading-4 text-text-primary dark:text-text-primary-dark border-y-[1px] border-separator">
    <div className="min-w-max w-[10%] ml-0.5">Token</div>
    <div className="min-w-max w-[15%] ml-6">Date</div>
    <div className="min-w-max w-[15%] ml-6">Time</div>
    <div className="w-[85%]">Event</div>
  </div>
);

export default TableHead;
