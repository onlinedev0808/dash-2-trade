import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Appearance, Subscription, Security } from "./_Content";
import "react-circular-progressbar/dist/styles.css";
import Layout from "./_Content/Layout";
import { useAppDispatch } from "../../redux/hooks";
import { updateUserData } from "../../redux/reducers/UserSlice";

const Settings = () => {
  const [activeButton, setActiveButton] = useState(0);
  const [content, setContent] = useState(<Appearance />);
  const [title, setTitle] = useState("Appearance");

  const router = useRouter();
  const { code } = router.query;

  const dispatch = useAppDispatch();

  const confirmEmail = async () => {
    try {
      const { data } = await axios.post(`/api/login/verify-email`, { code });

      dispatch(updateUserData({ ...data.user }));
      router.push("/settings");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (code) {
      confirmEmail();
    }
  }, []);

  const handleAppearance = () => {
    if (activeButton === 0) return;
    setActiveButton(0);
    setContent(<Appearance />);
    setTitle("Appearance");
  };

  const handleSubscription = () => {
    if (activeButton === 1) return;
    setActiveButton(1);
    setContent(<Subscription />);
    setTitle("Subscription");
  };

  const handleSecurity = () => {
    if (activeButton === 2) return;
    setActiveButton(2);
    setContent(<Security />);
    setTitle("Security");
  };

  return (
    <div className="flex xl:h-full flex-wrap">
      <div className="mx-8 xl:w-[22.25rem] flex-wrap xl:flex-nowrap w-full border-b-1 xl:border-b-0 xl:border-r-1 border-solid border-[#fff3] xl:h-full flex flex-row xl:flex-col justify-between xl:justify-start gap-x-6">
        <div className="xl:grow-0 grow xl:mr-8">
          <span className="text-base leading-[2.7rem] text-text-primary dark:text-text-primary-dark">
            Settings
          </span>
          <div
            className={`${
              activeButton === 0
                ? "text-text-primary dark:text-text-primary-dark border-2 border-button-primary border-solid rounded-xl"
                : "text-text-secondary dark:text-text-secondary-dark"
            } text-sm cursor-pointer flex items-center -ml-3 p-3 mt-5`}
            onClick={handleAppearance}
          >
            Appearance
          </div>
          <div
            className={`${
              activeButton === 1
                ? "text-text-primary dark:text-text-primary-dark border-2 border-button-primary border-solid rounded-xl"
                : "text-text-secondary dark:text-text-secondary-dark"
            } text-sm cursor-pointer flex items-center -ml-3 p-3`}
            onClick={handleSubscription}
          >
            Subscription
          </div>
          <div
            className={`${
              activeButton === 2
                ? "text-text-primary dark:text-text-primary-dark border-2 border-button-primary border-solid rounded-xl"
                : "text-text-secondary dark:text-text-secondary-dark"
            } text-sm cursor-pointer flex items-center -ml-3 p-3`}
            onClick={handleSecurity}
          >
            Security
          </div>
        </div>

        <div className="mt-8 p-[1.125rem] w-full sm:w-[19.25rem] min-h-[11.25rem] bg-button-primary rounded-md mb-8 xl:mb-0">
          <div className="flex gap-4">
            <div className="w-16 flex-shrink-0">
              <CircularProgressbar
                value={75}
                text={`${75}%`}
                styles={buildStyles({
                  pathColor: `#fff`,
                  textColor: "#fff",
                  trailColor: "#5367FE",
                  backgroundColor: "#5367FE",
                })}
              />
            </div>
            <div>
              <span className="text-base text-white">Profile Information</span>
              <p className="text-sm text-white/[0.5]">
                Complete your profile to unlock all features
              </p>
            </div>
          </div>
          <button className="mt-8 bg-white rounded-md w-full h-[2.625rem] text-button-primary text-sm hover:text-white hover:bg-button-primary border-white border-1 duration-200">
            Complete My Profile
          </button>
        </div>
      </div>
      <div className="grow">
        <Layout title={title}>{content}</Layout>
      </div>
    </div>
  );
};

export default Settings;
