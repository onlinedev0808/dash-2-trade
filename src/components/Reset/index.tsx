import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Reset = ({ type = "email" }) => {
  const router = useRouter();

  const code: string | string[] = router.query.code || "";
  const email: string | string[] = router.query.email || "";

  const [title, setTitle] = useState(
    type === "email" ? "Reseting your email" : "Reseting your password"
  );

  const resetEmail = async () => {
    if (!code || !email) return;
    try {
      await axios.post("/api/login/reset-email", {
        code,
        email,
      });

      setTitle("Your account email was successfully reset");
    } catch (err) {
      console.log(err);
      if (err.response.data.error === "Tokens don't match") {
        setTitle("Invalid reset email token");
      } else if (err.response.data.error === "Verification token expired") {
        setTitle("Verification token expired");
      } else setTitle("Internal server error");
    }
  };

  const resetPassword = async () => {
    if (!code) return;
    try {
      await axios.post("/api/login/confirm-change-password", {
        code,
      });

      setTitle("Your password was successfully changed");
    } catch (err) {
      console.log(err);
      if (err.response.data.error === "Tokens don't match") {
        setTitle("Invalid reset token");
      } else if (err.response.data.error === "Verification token expired") {
        setTitle("Verification token expired");
      } else setTitle("Internal server error");
    }
  };

  useEffect(() => {
    if (type === "email") resetEmail();

    if (type === "password") resetPassword();
  }, [code, email]);

  return (
    <div className="flex justify-center items-center h-full">
      <span>{title}</span>
    </div>
  );
};

export default Reset;
