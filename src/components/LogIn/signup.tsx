import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";

import { QuantfinityLogo } from "../CommonSvg";
import CustomInput from "./custominput";
import ModalWrapper from "../common/ModalWrapper";
import Checkbox from "../common/form/Checkbox";
import { prepareName } from "../../utils";
import testPasswordStrength, {
  PASSWORD_STRENGTH_INITIAL,
  PASSWORD_STRENGTH_TITLES,
} from "../../utils/password-strength";
import PasswordStrengthItem from "../common/password/PasswordStrengthItem";

const SignUpDialog = ({ openVerify, openSignIn }) => {
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [pwdErrorMessage, setPwdErrorMessage] = useState("");
  const [pwdConfirmErrorMessage, setPwdConfirmErrorMessage] = useState("");
  const [
    pwdAgreedToTermsOfServiceErrorMessage,
    setAgreedToTermsOfServiceErrorMessage,
  ] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isPasswordStrengthDialogActive, setIsPasswordStrengthDialogActive] =
    useState(false);

  const [agreedToTermsOfService, setAgreedToTermsOfService] = useState(false);
  const [agreedToReceiveNewsletters, setAgreedToReceiveNewsletters] =
    useState(false);

  const [passwordStrength, setPasswordStrength] = useState({
    ...PASSWORD_STRENGTH_INITIAL,
  });

  const handleSignUp = async (email, password) => {
    try {
      await axios.post(`/api/login/signup`, {
        email,
        password,
        agreedToReceiveNewsletters,
      });

      toast.success("Registered successfully");
      openVerify(email);
    } catch (error) {
      if (error.response.data.error == "Email already exists")
        setEmailErrorMessage("Account already exists");
    }
  };

  const validatePasswordStrength = () => {
    setPasswordStrength(testPasswordStrength(password));
  };

  useEffect(() => {
    validatePasswordStrength();
  }, [password]);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!agreedToTermsOfService) {
      setAgreedToTermsOfServiceErrorMessage(
        "You must accept Dash2Trade's Terms of Service"
      );
      return;
    }

    if (!email) {
      setEmailErrorMessage("You must enter an email.");
      setPwdErrorMessage("");
      setPwdConfirmErrorMessage("");
      setAgreedToTermsOfServiceErrorMessage("");
      return;
    }

    if (!validator.isEmail(email)) {
      setEmailErrorMessage("You must enter a valid email.");
      setPwdConfirmErrorMessage("");
      setPwdErrorMessage("");
      setAgreedToTermsOfServiceErrorMessage("");
      return;
    }

    if (!password) {
      setPwdErrorMessage("You must enter a password.");
      setPwdConfirmErrorMessage("");
      setEmailErrorMessage("");
      setAgreedToTermsOfServiceErrorMessage("");
      return;
    }

    if (passwordConfirm !== password) {
      setPwdConfirmErrorMessage(`Password doesn't match`);
      setEmailErrorMessage("");
      setPwdErrorMessage("");
      setAgreedToTermsOfServiceErrorMessage("");
      return;
    }

    const checkPasswordStrength = Object.values(passwordStrength).filter(
      (value) => !value
    );

    if (checkPasswordStrength.length) {
      setPwdErrorMessage("Password is too weak");
      setPwdConfirmErrorMessage("");
      setEmailErrorMessage("");
      setAgreedToTermsOfServiceErrorMessage("");
      return;
    }

    if (password.length < 16) {
      setPwdErrorMessage("Password must contain more than 16 characters");
      setPwdConfirmErrorMessage("");
      setEmailErrorMessage("");
      setAgreedToTermsOfServiceErrorMessage("");
      return;
    }

    setPwdErrorMessage("");
    setPwdConfirmErrorMessage("");
    setEmailErrorMessage("");
    setAgreedToTermsOfServiceErrorMessage("");

    await handleSignUp(email, password);
  };

  useEffect(() => {
    setPwdErrorMessage("");
    setPwdConfirmErrorMessage("");
    setEmailErrorMessage("");
  }, []);

  return (
    <ModalWrapper>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-foreground px-12 w-[24.2rem] dark:bg-foreground-dark rounded-xl my-auto mx-auto text-text-primary dark:text-text-primary-dark flex flex-col border-1 border-white items-center"
      >
        <div className="h-16 mx-auto">
          <QuantfinityLogo />
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <div className="mx-auto mt-10 mb-1 w-72 relative flex flex-col gap-1">
            <CustomInput
              label="Email"
              name="email"
              type="text"
              errorText={emailErrorMessage}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <CustomInput
              label="Password"
              name="password"
              type="password"
              errorText={pwdErrorMessage}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => {
                setIsPasswordStrengthDialogActive(true);
              }}
            />

            <CustomInput
              label="Confirm Password"
              name="confirmpassword"
              type="password"
              errorText={pwdConfirmErrorMessage}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />

            {isPasswordStrengthDialogActive && (
              <div className="bg-highlight dark:bg-highlight-dark rounded p-2">
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
          </div>

          <div className="flex flex-col w-full">
            <Checkbox
              label="newsletters"
              checked={agreedToReceiveNewsletters}
              onChange={() =>
                setAgreedToReceiveNewsletters(!agreedToReceiveNewsletters)
              }
            >
              <span>
                I want to receive newsletters, company news and product updates
              </span>
            </Checkbox>
            <Checkbox
              label="termsofservice"
              checked={agreedToTermsOfService}
              onChange={() =>
                setAgreedToTermsOfService(!agreedToTermsOfService)
              }
              error={pwdAgreedToTermsOfServiceErrorMessage}
            >
              I agree to Dash2Trade&apos;s <a href="">Terms of Service</a>
            </Checkbox>
          </div>

          <button
            type="submit"
            className="text-white disabled:opacity-75 mx-auto bg-[#5366FF] rounded-lg py-2 px-10 w-72"
          >
            Continue
          </button>
        </form>
        <div
          className="text-text-secondary dark:text-text-secondary-dark text-sm mt-6 hover:opacity-100 mb-9 cursor-pointer"
          onClick={openSignIn}
        >
          Already have an account? Sign In
        </div>
      </div>
    </ModalWrapper>
  );
};

export default SignUpDialog;
