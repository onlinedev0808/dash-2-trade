import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import QRCode from "qrcode";
import InputForm from "../InputForm";
import Button from "./Button";
import ToggleForm from "../ToggleForm";
import ConfirmIdentityDialog from "./ConfirmIdentity";
import { useAppSelector } from "../../../redux/hooks";
import { prepareName } from "../../../utils";
import testPasswordStrength, {
  PASSWORD_STRENGTH_TITLES,
  PASSWORD_STRENGTH_INITIAL,
} from "../../../utils/password-strength";
import PasswordStrengthItem from "../../common/password/PasswordStrengthItem";

const Security = () => {
  const userData = useAppSelector((state) => state.user);

  const qrCanvasRef = useRef(null);

  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmNewPwd, setConfirmNewPwd] = useState("");
  const [code, setCode] = useState("");

  const [link, setLink] = useState("");

  const [oldPwdError, setOldPwdError] = useState("");
  const [newPwdError, newOldPwdError] = useState("");

  const [passwordStrength, setPasswordStrength] = useState({
    ...PASSWORD_STRENGTH_INITIAL,
  });

  const validatePasswordStrength = () => {
    setPasswordStrength(testPasswordStrength(newPwd));
  };

  useEffect(() => {
    validatePasswordStrength();
  }, [newPwd]);

  const [isMFAEnabled, setIsMFAEnabled] = useState(userData.mfa);
  const [isConfirmationOpened, setIsConfirmationOpened] = useState(false);

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

  const updateEnableMFA = async () => {
    setIsConfirmationOpened(true);
  };

  useEffect(() => {
    setIsMFAEnabled(userData.mfa);
  }, [userData]);

  const formRef = useRef(null);

  const [isPasswordStrengthDialogActive, setIsPasswordStrengthDialogActive] =
    useState(false);

  const handleChangePassword = async (oldPassword, newPassword) => {
    try {
      await axios.post(`/api/login/change-password`, {
        oldPassword,
        newPassword,
        code,
      });
      toast.success("We've sent you an email to confirm password change");
      formRef.current.reset();
    } catch (error) {
      if (error.response.data.error == "Password incorrect")
        setOldPwdError("Password incorrect");
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!newPwd) {
      newOldPwdError("You must enter a password.");
      setOldPwdError("");
      return;
    }

    if (newPwd !== confirmNewPwd) {
      newOldPwdError("Passwords don't match.");
      setOldPwdError("");
      return;
    }

    const checkPasswordStrength = Object.values(passwordStrength).filter(
      (value) => !value
    );

    if (checkPasswordStrength.length) {
      newOldPwdError("Password is too weak");
      setOldPwdError("");
      return;
    }

    if (newPwd.length < 16) {
      newOldPwdError("Password must contain more than 16 letters");
      setOldPwdError("");
      return;
    }

    setOldPwdError("");
    newOldPwdError("");

    await handleChangePassword(oldPwd, newPwd);
  };

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

  return (
    <>
      {isConfirmationOpened && (
        <ConfirmIdentityDialog
          close={() => setIsConfirmationOpened(false)}
          enableMFA={!isMFAEnabled}
        />
      )}
      <div>
        <form onSubmit={onSubmit} ref={formRef}>
          <div className="flex justify-between flex-wrap">
            {userData.mfa ? (
              <div className="flex flex-col w-full">
                <div className="mb-4 flex justify-center">
                  <canvas ref={qrCanvasRef} />
                </div>

                <InputForm
                  label="Code"
                  name="code"
                  type="text"
                  placeholder="Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            ) : null}
            <InputForm
              name="oldPassword"
              label="Old Password"
              type="password"
              placeholder="Old Password"
              errorMessage={oldPwdError}
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
            />
            <InputForm
              name="newPassword"
              label="New Password"
              type="password"
              placeholder="New Password"
              errorMessage={newPwdError}
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              onFocus={() => {
                setIsPasswordStrengthDialogActive(true);
              }}
            />

            {isPasswordStrengthDialogActive && (
              <div className="bg-foreground dark:bg-foreground-dark rounded p-2">
                <h6 className="mb-1 text-sm">Your password must</h6>
                <ul>
                  {Object.keys(passwordStrength).map((key) => (
                    <PasswordStrengthItem
                      key={key}
                      title={PASSWORD_STRENGTH_TITLES[key] || prepareName(key)}
                      passed={passwordStrength[key]}
                    />
                  ))}
                </ul>
              </div>
            )}

            <InputForm
              name="confirmNewPassword"
              label="Confirm New Password"
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPwd}
              onChange={(e) => setConfirmNewPwd(e.target.value)}
            />
          </div>
          <div className="mt-10 flex justify-between">
            <span className="text-base leading-[1.875rem] text-text-primary dark:text-text-primary-dark">
              Enable Multifactor Authentication
            </span>
            <ToggleForm isActive={isMFAEnabled} onChange={updateEnableMFA} />
          </div>
          <div className="mt-12 flex gap-4 flex-wrap">
            <Button type="submit">Save</Button>
            <Button
              color="white"
              onClick={() => {
                setConfirmNewPwd("");
                setNewPwd("");
                setOldPwd("");
                setCode("");
              }}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Security;
