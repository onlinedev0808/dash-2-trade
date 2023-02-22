import React, { useState, useMemo, useEffect } from "react";

const initContext = {
  handleIsSidebarOpen: (flag: boolean) => {},
  handleIsModalOpen: (flag: boolean) => {},
};

const ScrollContext = React.createContext(initContext);

export const ScrollContextProvider = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const providerValue = useMemo(
    () => ({
      handleIsSidebarOpen: setIsSidebarOpen,
      handleIsModalOpen: setIsModalOpen,
    }),
    []
  );

  useEffect(() => {
    const className = "disable-scroll";

    if (isSidebarOpen || isModalOpen) {
      document.body.classList.add(className);
      document.querySelector("html").classList.add(className);
    } else {
      document.body.classList.remove(className);
      document.querySelector("html").classList.remove(className);
    }
  }, [isSidebarOpen, isModalOpen]);

  return (
    <ScrollContext.Provider value={providerValue}>
      {props.children}
    </ScrollContext.Provider>
  );
};

export default ScrollContext;
