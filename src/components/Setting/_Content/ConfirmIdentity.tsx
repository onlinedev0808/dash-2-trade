import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import QRCode from "qrcode";
import { QuantfinityLogo } from "../../CommonSvg";
import CustomInput from "../../LogIn/custominput";

import ModalWrapper from "../../common/ModalWrapper";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateUserData } from "../../../redux/reducers/UserSlice";

const ConfirmIdentityDialog = ({
  close,
  enableMFA,
  title = "To continue setting up your authentication method, first, verify your password.",
  onConfirm = null,
}) => {
  const userData = useAppSelector((state) => state.user);

  const [pwdErrorMessage, setPwdErrorMessage] = useState("");

  const [codeErrorMessage, setCodeErrorMessage] = useState("");

  const [link, setLink] = useState("");

  const qrCanvasRef = useRef(null);

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const handleVerifyIdentity = async () => {
    try {
      await axios.post(`/api/login/verify-identity`, { password, code });
      await onConfirm();
      close();
    } catch (err) {
      console.log(err);
      if (err.response.data.error === "Password incorrect")
        setPwdErrorMessage(
          userData.mfa ? "Incorrect password or code" : "Incorrect password"
        );
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (onConfirm) {
      try {
        await handleVerifyIdentity();
      } catch (err) {
        console.log(err);
      }
      return;
    }

    try {
      const { data } = await axios.post(`/api/login/mfa`, {
        enableMFA,
        password,
        email: userData.email,
        code,
      });

      dispatch(updateUserData({ ...data.user }));
      toast.success(
        enableMFA
          ? "Multifactor Authentication was enabled"
          : "Multifactor Authentication was disabled"
      );

      close();
    } catch (error) {
      if (error.response.data.error === "Password incorrect")
        setPwdErrorMessage(
          userData.mfa ? "Incorrect password or code" : "Incorrect password"
        );
    }
  };

  useEffect(() => {
    setPwdErrorMessage("");
  }, []);

  useEffect(() => {
    if (userData.mfa && link) {
      const generateQR = async (text) => {
        QRCode.toCanvas(qrCanvasRef.current, text, (error) => {
          if (error) console.error(error);
        });
      };

      generateQR(link);
    }
  }, [link, userData]);

  useEffect(() => {
    if (!userData.mfa) return;
    const fetchLink = async () => {
      try {
        const { data } = await axios.post(`/api/login/link`, {
          email: userData.email,
        });

        setLink(data.link);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLink();
  }, [userData]);

  return (
    <ModalWrapper onClick={close}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-foreground px-12 dark:bg-foreground-dark rounded-xl my-auto mx-auto text-text-primary dark:text-text-primary-dark flex flex-col border-1 border-white items-center"
      >
        <div className="h-16 mx-auto">
          <QuantfinityLogo />
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <p>{title}</p>
          </div>
          {userData.mfa ? (
            <>
              <div className="mb-4 flex justify-center">
                <canvas ref={qrCanvasRef} />
              </div>

              <div className="mx-auto w-72">
                <CustomInput
                  label="Code"
                  name="code"
                  type="text"
                  errorText={codeErrorMessage}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            </>
          ) : null}

          <div className="mx-auto w-72">
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
            className="mb-6 text-white disabled:opacity-75 mx-auto bg-[#5366FF] rounded-lg py-2 px-10 w-72"
          >
            Continue
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmIdentityDialog;
