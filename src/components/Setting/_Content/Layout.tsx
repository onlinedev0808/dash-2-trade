import React from "react";

const Layout = ({ title, children }) => (
  <div className="px-8 w-full grow">
    <span className="text-base leading-[2.625rem] text-text-primary dark:text-text-primary-dark">
      {title}
    </span>
    <div className="border-t-1 border-solid border-border-primary mt-8 pt-8">
      {children}
    </div>
  </div>
);

export default Layout;
