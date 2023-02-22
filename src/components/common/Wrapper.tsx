const CardWrapper = ({ children, classes = "", direction = "col" }) => (
  <div className={`flex flex-${direction} gap-2.5 md:gap-4 ${classes}`}>
    {children}
  </div>
);

export default CardWrapper;
