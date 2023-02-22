import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faWallet } from "@fortawesome/free-solid-svg-icons";
import { NextPage } from "next";

interface IPaywallDialogProps {
  isOpen: boolean;
  close: () => void;
}

const PaywallDialog: NextPage<IPaywallDialogProps> = ({ isOpen, close }) => (
  <div
    onClick={close}
    className={`fixed top-0 left-0 w-[100%] h-[100%] z-50 bg-black/50 backdrop-blur-sm ${
      isOpen ? "flex" : "hidden"
    }`}
  >
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="bg-highlight dark:bg-highlight-dark rounded-xl my-auto mx-auto text-white p-5 flex flex-col"
    >
      <div className="flex flex-row justify-between">
        <p className="text-lg mb-5">Paywall</p>
        <button className="h-fit" onClick={close}>
          <FontAwesomeIcon icon={faXmark} className="w-[16px]" />
        </button>
      </div>
      <div className="flex items-center">
        <div className="md:w-[286px] w-[180px]">
          <p className="md:leading-[47px] leading-[35px] text-lg">
            Not enough <span className="text-button-primary">Tokens</span> In
            wallet buy more here
          </p>
        </div>
        <div className="rounded-[100%] bg-white">
          <FontAwesomeIcon
            icon={faWallet}
            className="fa-regular text-lg md:p-[30px] p-[20px] text-button-primary"
          />
        </div>
      </div>

      <button className="disabled:opacity-75 mr-auto bg-button-primary rounded py-[8px] px-[16px] mt-[20px]">
        <FontAwesomeIcon icon={faWallet} className="fa-regular px-[4px]" />
        Click Here
      </button>
    </div>
  </div>
);

export default PaywallDialog;
