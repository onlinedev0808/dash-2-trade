import React, { ReactNode } from "react";

interface IModalWrapper {
  children: ReactNode;
  classes?: string;
  onClick?: () => void;
}

const ModalWrapper = ({ children, classes, onClick }: IModalWrapper) => {
  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    onClick?.();
  };

  return (
    <div
      onClick={handleSubmit}
      className={`fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/50 backdrop-blur-sm flex ${
        classes ?? ""
      }`}
    >
      {children}
    </div>
  );
};

export default ModalWrapper;
