import { Fragment } from "react";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { faSignOut, faCog, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";

import { formatAddress, connectWallet } from "./WalletConnect";
import { initialState, updateUserData } from "../../redux/reducers/UserSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateWalletAddress } from "../../redux/reducers/WalletSlice";

interface IDropDownItem {
  children: React.ReactNode;
  onClick: () => void;
}

const DropDownItem = ({ children, onClick }: IDropDownItem) => (
  <button
    className="hover:text-opacity-100 text-text-secondary dark:text-text-secondary-dark group flex w-full items-center rounded-md px-4 py-1"
    onClick={onClick}
  >
    {children}
  </button>
);

export default function Account() {
  const imageUrl = useAppSelector((state) => state.user.profileImage);
  const email = useAppSelector((state) => state.user.email);
  const router = useRouter();

  const walletAddress = useAppSelector((state) => state.wallet.address);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(`/api/login/logout`);
      dispatch(
        updateUserData({
          ...initialState,
        })
      );
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const gotoSettings = () => {
    router.push("/settings");
  };

  async function handleConnectWallet() {
    const accounts = await connectWallet();
    if (accounts) dispatch(updateWalletAddress(accounts[0]));
  }
  return (
    <Menu as="div">
      <Menu.Button className="flex w-full justify-center rounded-md text-sm text-text-primary dark:text-text-primary-dark hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 lg:pr-6">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            width={40}
            height={40}
            className="rounded-full w-10 h-10"
          />
        ) : (
          <Image
            src={`https://avatars.dicebear.com/api/initials/${email}.svg`}
            alt=""
            width={40}
            height={40}
            className="rounded-full w-10 h-10"
          />
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute right-10 mt-6 min-w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-background dark:bg-background-dark shadow-lg border-white border-1 focus:outline-none text-lg">
          <div className="px-1 py-1.5 text-base">
            <div>
              <DropDownItem onClick={walletAddress || handleConnectWallet}>
                <FontAwesomeIcon icon={faWallet} className="fa-regular mr-2" />
                {walletAddress
                  ? formatAddress(walletAddress)
                  : "Connect Wallet"}
              </DropDownItem>
            </div>
            <div>
              <DropDownItem onClick={gotoSettings}>
                <FontAwesomeIcon icon={faCog} className="fa-regular mr-2" />
                Settings
              </DropDownItem>
            </div>
            <div>
              <DropDownItem onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOut} className="fa-regular mr-2" />
                Logout
              </DropDownItem>
            </div>
          </div>
        </div>
      </Transition>
    </Menu>
  );
}
