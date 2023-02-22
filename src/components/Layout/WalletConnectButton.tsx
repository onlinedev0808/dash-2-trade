import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";

import { NextPage } from "next";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateWalletAddress } from "../../redux/reducers/WalletSlice";

import { providerOptions } from "./providerOptions";

const createUserIfNew = async (walletAddress) => {
  if (walletAddress == "") return;

  await axios.post("/api/user", {
    walletAddress,
  });
};

interface IWalletConnectButtonProps {
  dialogButton?: boolean;
  close?: () => void;
}

const WalletConnectButton: NextPage<IWalletConnectButtonProps> = () => {
  const web3ModalRef = useRef(null);
  const walletAddress = useAppSelector((state) => state.wallet.address);
  const dispatch = useAppDispatch();

  const formatAddress = (address) =>
    `${address.slice(0, 5)}...${address.slice(-4)}`;

  useEffect(() => {
    if (!walletAddress) {
      web3ModalRef.current = new Web3Modal({
        cacheProvider: true,
        providerOptions,
      });
      // connectWallet();
    }
  }, []);

  const connectWallet = async () => {
    try {
      // if (walletAddress) {
      //   await web3ModalRef.current.clearCachedProvider();
      //   setWalletAddress(null);
      //   return;
      // }
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const accounts = await web3Provider.listAccounts();

      if (accounts) dispatch(updateWalletAddress(accounts[0]));
      await createUserIfNew(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row cursor-pointer gap-2" onClick={connectWallet}>
      <div className="rounded-full bg-button-wallet p-2 px-3">
        <FontAwesomeIcon icon={faWallet} className="fa-regular" />
      </div>

      <p className="my-auto">
        {walletAddress ? formatAddress(walletAddress) : "Connect Wallet"}
      </p>
    </div>
  );
};

export default WalletConnectButton;
