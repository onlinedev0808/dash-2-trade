import { useState, useEffect, useRef } from "react";
import Web3Modal from "web3modal";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";
import QRCode from "qrcode";
import { providerOptions } from "../Layout/providerOptions";
import {
  QuantfinityLogo,
  MetaMaskLogo,
  WalletConnectLogo,
  OperaLogo,
  CoinBaseLogo,
} from "../CommonSvg";
import CustomInput from "./custominput";

import { useAppDispatch } from "../../redux/hooks";
import { updateUserData } from "../../redux/reducers/UserSlice";
import ModalWrapper from "../common/ModalWrapper";

const AUTH_STEPS = [
  {
    id: 1,
    name: "password",
  },
  {
    id: 2,
    name: "totp",
  },
];

const LogInDialog = ({ close, openSignUp, openVerify }) => {
  const [web3Modal, setWeb3Modal] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [pwdErrorMessage, setPwdErrorMessage] = useState("");
  const [codeErrorMessage, setCodeErrorMessage] = useState("");

  const [step, setStep] = useState(AUTH_STEPS[0]);
  const [hasMFA, setHasMFA] = useState(false);
  const [link, setLink] = useState("");

  const qrCanvasRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const dispatch = useAppDispatch();

  const handleLogin = async (email, password, code = "") => {
    try {
      const response = await axios.post(`/api/login/login`, {
        email,
        password,
        code,
      });

      const userData = response.data.user;

      dispatch(updateUserData({ ...userData }));
      toast.success("You logged in successfully!");
      close();
    } catch (error) {
      if (error.response.data.error === "You must verify your identity") {
        setHasMFA(true);
        setLink(error.response.data.link);
        setStep(AUTH_STEPS[1]);
      } else if (error.response.data.error === "Account does not exist")
        setEmailErrorMessage("Account does not exist");
      else if (error.response.data.error === "Email is not verified")
        openVerify(email);
      else if (error.response.data.error === "Password incorrect" && hasMFA) {
        setCodeErrorMessage("Incorrect password or code");
        setEmailErrorMessage("");
      } else if (error.response.data.error === "Password incorrect") {
        setPwdErrorMessage("Password incorrect");
        setEmailErrorMessage("");
      }
    }
  };

  const checkMFAStatus = async () => {
    if (!email) {
      setEmailErrorMessage("You must enter an email.");
      setPwdErrorMessage("");
      return;
    }

    if (!validator.isEmail(email)) {
      setEmailErrorMessage("You must enter a valid email.");
      setPwdErrorMessage("");
      return;
    }

    try {
      const { data } = await axios.post(`/api/login/check-mfa`, {
        email,
      });

      if (data?.enableMFA) {
        setHasMFA(true);
        setLink(data.otp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (hasMFA) {
      setStep(AUTH_STEPS[1]);
      return;
    }

    if (!password) {
      setPwdErrorMessage("You must enter a password.");
      setEmailErrorMessage("");
      return;
    }

    setEmailErrorMessage("");
    setPwdErrorMessage("");

    await handleLogin(email, password);
  };

  const onMFASubmit = async (event) => {
    event.preventDefault();

    if (!code) {
      setCodeErrorMessage("You must enter a verification code.");
      return;
    }

    if (code.length < 6) {
      setCodeErrorMessage("Invalid verification code.");
      return;
    }

    setCodeErrorMessage("");

    await handleLogin(email, password, code);
  };

  useEffect(() => {
    const newWeb3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions,
    });

    setWeb3Modal(newWeb3Modal);
  }, []);

  useEffect(() => {
    setPwdErrorMessage("");
    setEmailErrorMessage("");
  }, []);

  async function connectWallet() {
    await web3Modal.connect();
  }

  useEffect(() => {
    if (step.id !== 2) return;
    const generateQR = async (text) => {
      QRCode.toCanvas(qrCanvasRef.current, text, (error) => {
        if (error) console.error(error);
      });
    };

    generateQR(link);
  }, [step]);

  return (
    <ModalWrapper>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-foreground px-12 dark:bg-foreground-dark rounded-xl my-auto mx-auto text-text-primary dark:text-text-primary-dark flex flex-col border-1 border-white items-center"
      >
        <div className="h-16 mx-auto">
          <QuantfinityLogo />
        </div>
        {step.id === 1 && (
          <form onSubmit={onSubmit}>
            <div className="mx-auto mt-10 mb-7 w-72">
              <CustomInput
                label="Email"
                name="email"
                type="text"
                errorText={emailErrorMessage}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={checkMFAStatus}
              />
              <CustomInput
                label="Password"
                name="password"
                type="password"
                errorText={pwdErrorMessage}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="text-white disabled:opacity-75 mx-auto bg-[#5366FF] rounded-lg py-2 px-10 w-72"
            >
              Continue
            </button>
          </form>
        )}
        {step.id === 2 && (
          <form onSubmit={onMFASubmit} className="flex flex-col gap-4">
            <div className="flex justify-center">
              <canvas ref={qrCanvasRef} />
            </div>

            <div>
              <CustomInput
                label="Code"
                name="code"
                type="text"
                errorText={codeErrorMessage}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="text-white disabled:opacity-75 mx-auto bg-[#5366FF] rounded-lg py-2 px-10 w-72"
            >
              Continue
            </button>
          </form>
        )}

        <div
          className="text-text-secondary dark:text-text-secondary-dark opacity-50 text-sm mt-6 hover:opacity-100 cursor-pointer"
          onClick={openSignUp}
        >
          {`Don't have an account? Sign Up`}
        </div>
        <div className="flex flex-row w-64 justify-center items-center mx-auto mt-7 text-text-primary dark:text-text-primary-dark opacity-50">
          <hr className="w-full border-border-primary border-1 border-opacity-10" />
          <div className="text-sm mx-2 shrink-0">Connect Wallet</div>
          <hr className="w-full border-border-primary border-1 border-opacity-10" />
        </div>
        <div className="flex flex-row justify-center items-center gap-5 mt-7 mb-10">
          <div
            className="w-9 flex justify-center cursor-pointer"
            onClick={connectWallet}
          >
            <MetaMaskLogo />
          </div>
          <div
            className="w-9 flex justify-center cursor-pointer"
            onClick={connectWallet}
          >
            <WalletConnectLogo />
          </div>
          <div
            className="w-9 flex justify-center cursor-pointer"
            onClick={connectWallet}
          >
            <CoinBaseLogo />
          </div>
          <div
            className="w-9 flex justify-center cursor-pointer"
            onClick={connectWallet}
          >
            <OperaLogo />
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default LogInDialog;
