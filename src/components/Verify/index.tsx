import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const Verify = ({ code }) => {
  const router = useRouter();
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    if (counter == 0) router.push("/");

    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => clearInterval(timer);
  }, [counter]);

  const handleLogin = async () => {
    try {
      await axios.post(`../api/login/verify`, { code });
    } catch (error) {
      console.log(error);
      router.push("/404");
    }
  };

  useEffect(() => {
    if (code) handleLogin();
  }, [code]);

  return (
    <span>
      Email verified successfully, redirecting you to the home page in {counter}{" "}
      sec
    </span>
  );
};

export default Verify;
