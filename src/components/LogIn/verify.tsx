import axios from "axios";
import { toast } from "react-toastify";
import { QuantfinityLogo } from "../CommonSvg";
import ModalWrapper from "../common/ModalWrapper";

const VerifyDialog = ({ openSignIn, verifyEmail }) => {
  const handleResend = async () => {
    try {
      await axios.post(`/api/login/resend`, { email: verifyEmail });
      toast.success("Resent successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ModalWrapper>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-foreground dark:bg-foreground-dark rounded-xl my-auto mx-auto text-text-primary dark:text-text-primary-dark flex flex-col border-1 border-white items-center w-96 px-10"
      >
        <div className="h-16 w-48 mx-24">
          <QuantfinityLogo />
        </div>

        <div className="py-5">Verify your Account</div>
        <div className="text-sm pb-5 opacity-90 w-72">
          <p>A verification email was sent to</p>
          <p className="pb-3 opacity-100">{verifyEmail}</p>
          <p className="pb-3">
            Please check your email and confirm your account by clicking the
            verification link.
          </p>
          <p>
            If you missed it check your spam folder or click below to resend
            your verification email.
          </p>
        </div>
        <button
          onClick={handleResend}
          className="text-white disabled:opacity-75 mx-auto bg-button-primary rounded-lg py-2 px-10 w-72"
        >
          Resend Email
        </button>
        <button
          onClick={openSignIn}
          className="text-text-secondary dark:text-text-secondary-dark text-sm mt-6 mb-10 hover:opacity-100 cursor-pointer"
        >
          Email above incorrect? Log in again.
        </button>
      </div>
    </ModalWrapper>
  );
};

export default VerifyDialog;
