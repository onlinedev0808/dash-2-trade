import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faWallet } from "@fortawesome/free-solid-svg-icons";
import WalletConnectButton from "./Layout/WalletConnectButton";

const ConnectWalletDialog = ({ isOpen, close }) => (
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
      <div className="flex flex-row justify-end">
        <button className="h-fit" onClick={close}>
          <FontAwesomeIcon icon={faXmark} className="w-[16px]" />
        </button>
      </div>
      <div className="flex items-center">
        <div className="md:w-[286px] w-[180px]">
          <p className="leading-[35px] text-lg">
            Connect your wallet to continue
          </p>
        </div>
        <div className="rounded-[100%] bg-white">
          <FontAwesomeIcon
            icon={faWallet}
            className="fa-regular text-lg md:p-[30px] p-[20px] text-[#5366FF]"
          />
        </div>
      </div>
      <WalletConnectButton dialogButton close={close} />
    </div>
  </div>
);

export default ConnectWalletDialog;
