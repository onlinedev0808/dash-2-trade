import WalletConnect from "@walletconnect/web3-provider";
import WalletLink from "walletlink";

const INFURA_KEY = process.env.INFURA_KEY || "9aa3d95b3bc440fa88ea12eaa4456161";

export const providerOptions = {
  clvwallet: {
    package: true
  },
  opera: {
    package: true
  },
  "custom-walletlink": {
    display: {
      logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
      name: "Coinbase",
      description: "Connect to Coinbase Wallet (not Coinbase App)"
    },
    options: {
      appName: "Dash2Trade",
      networkUrl: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
      chainId: 1
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options;
      const walletLink = new WalletLink({
        appName
      });
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
      await provider.enable();
      return provider;
    }
  },
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: INFURA_KEY // required
    }
  }
};
