const InternalCardWrapper = ({ children, classes = "" }) => (
  <div
    className={`bg-highlight dark:bg-highlight-dark rounded-[14px] py-2 px-3 flex flex-col gap-2 ${classes}`}
  >
    {children}
  </div>
);

export default InternalCardWrapper;
