import ModalWrapper from "../../../common/ModalWrapper";

const Modal = ({ children, setIsOpened }) => (
  <ModalWrapper
    onClick={() => {
      setIsOpened(false);
    }}
  >
    <div className="m-auto w-2/3 bg-background-secondary-dark border-1 border-solid border-separator-blue rounded-card p-10" onClick={(e)=>e.stopPropagation()}>
      {children}
    </div>
  </ModalWrapper>
);

export default Modal;
