import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { providerOptions } from "./providerOptions";

export const createUserIfNew = async (walletAddress) => {
  if (walletAddress == "") return;
  await axios.post("/api/user", {
    walletAddress,
  });
};

export const formatAddress = (address) => {
  return address.slice(0, 5) + "..." + address.slice(-4);
};

export const connectWallet = async () => {
  const newWeb3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions,
  });

  try {
    const provider = await newWeb3Modal.connect();
    const web3Provider = new ethers.providers.Web3Provider(provider);
    var accounts = await web3Provider.listAccounts();
  } catch (error) {
    console.log(error);
  }
  return accounts;
};
