import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Select from "react-select";
import { toast } from "react-toastify";
import InputForm from "../InputForm";
import ToggleForm from "../ToggleForm";
import ThemeContext, { THEMES, THEME_PROPERTY } from "../../../theme";
import Button from "./Button";
import SectionLayout from "./SectionLayout";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateUserData } from "../../../redux/reducers/UserSlice";
import ConfirmIdentityDialog from "./ConfirmIdentity";
import ThemeSwitcher from "../ThemeSwitcher";

interface IUpdateProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  nickname?: string;
  profileImage?: string;
}

const Appearance = () => {
  const userData = useAppSelector((state) => state.user);
  const [nickname, setNickname] = useState(userData.nickname || "");
  const [firstName, setFirstName] = useState(userData.firstName || "");
  const [lastName, setLastName] = useState(userData.lastName || "");
  const [email, setEmail] = useState(userData.email || "");
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [imageUrl, setImageUrl] = useState(userData.profileImage || "");
  const [imageCategories, setImageCategories] = useState([]);

  const [emailError, setEmailError] = useState("");
  const [nicknameError, setNicknameError] = useState("");

  const [isConfirmationOpened, setIsConfirmationOpened] = useState(false);
  const [isMFAEnabled, setIsMFAEnabled] = useState(userData.mfa);

  const fetchCategory = async () => {
    const respond = await axios.get("/api/pfp/get-cat");
    setImageCategories(respond.data);
  };

  useEffect(() => {
    setIsMFAEnabled(userData.mfa);
  }, [userData]);

  useEffect(() => {
    fetchCategory();
  }, []);

  const dispatch = useAppDispatch();

  const [theme, setTheme] = useContext(ThemeContext);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(
    theme === THEMES.DARK
  );

  const enableDarkMode = () => {
    if (isDarkModeEnabled) {
      setTheme(THEMES.LIGHT);
      localStorage.setItem(THEME_PROPERTY, THEMES.LIGHT);
    }

    if (!isDarkModeEnabled) {
      setTheme(THEMES.DARK);
      localStorage.setItem(THEME_PROPERTY, THEMES.DARK);
    }

    setIsDarkModeEnabled(!isDarkModeEnabled);
  };

  const handleImageCategoryChange = (value: number) => {
    setSelectedCategory(value);
  };

  const handleGenerateImage = async () => {
    try {
      if (selectedCategory === -1) return;
      const url = await axios.get(
        `/api/pfp/get-pregen?category=${selectedCategory}`
      );
      setImageUrl(url.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => setIsDarkModeEnabled(theme === THEMES.DARK), [theme]);

  const handleUpdateProfile = async () => {
    try {
      const body: IUpdateProfileData = {};

      if (firstName && firstName !== userData.firstName)
        body.firstName = firstName;
      if (lastName && lastName !== userData.lastName) body.lastName = lastName;
      if (email !== userData.email) body.email = email;
      if (nickname !== userData.nickname) body.nickname = nickname;
      if (imageUrl !== userData.profileImage) body.profileImage = imageUrl;

      if (!Object.keys(body).length) return;

      const { data } = await axios.post("/api/user/profile", body);
      toast.success("Your profile information has been successfully updated");
      dispatch(
        updateUserData({
          ...data.user,
        })
      );
    } catch (err) {
      console.log(err);
      if (err.response.data.error === "Email already in use")
        setEmailError("Email already in use");
      else if (err.response.data.error === "Nickname is already in use")
        setNicknameError("Nickname is already in use");
    }
  };

  const handleSave = async () => {
    if (email !== userData.email) {
      setIsConfirmationOpened(true);
      return;
    }

    await handleUpdateProfile();
  };

  const validateNickname = async () => {
    try {
      await axios.get(`/api/user/nickname?nickname=${nickname}`);
    } catch (err) {
      console.log(err);
      if (err.response.data.error === "Nickname is already in use")
        setNicknameError("Nickname is already in use");
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      await validateNickname();
    }, 500);

    return () => clearTimeout(timer);
  }, [nickname]);

  const styles = {
    menu: (provided) => ({
      ...provided,
      padding: 4,
      backgroundColor: !isDarkModeEnabled ? "#DAD2EE" : "#1E1F24",
    }),
    option: (provided, state) => ({
      ...provided,
      color: !isDarkModeEnabled ? "#121318" : "#fff",
      "min-height": "3.125rem",
      paddingTop: "0.875rem",
      backgroundColor: !isDarkModeEnabled ? "#DAD2EE" : "#1E1F24",
    }),
    control: (provided, { isFocused }) => ({
      ...provided,
      backgroundColor: !isDarkModeEnabled ? "#DAD2EE" : "#1E1F24",
      border: "none",
      color: !isDarkModeEnabled ? "#545A75" : "#737373",
      height: "4vmin",
      maxHeight: "3.25rem",
      boxShadow: isFocused && "0 0 0 1px #7A7A7A",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: !isDarkModeEnabled ? "#545A75" : "#737373",
    }),
    input: (provided) => ({
      ...provided,
      color: !isDarkModeEnabled ? "#121318" : "#fff",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: !isDarkModeEnabled ? "#121318" : "#fff",
    }),
  };

  return (
    <>
      {isConfirmationOpened && (
        <ConfirmIdentityDialog
          close={() => setIsConfirmationOpened(false)}
          enableMFA={!isMFAEnabled}
          title="To continue setting up your email, first, verify your password."
          onConfirm={handleUpdateProfile}
        />
      )}
      <SectionLayout title="Personal Information">
        <div className="grid gap-6">
          <InputForm
            label="Nickname"
            type="text"
            placeholder="Nickname"
            errorMessage={nicknameError}
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
          <div className="flex justify-between flex-wrap lg:flex-nowrap flex-row">
            <div className="w-[49%]">
              <InputForm
                label="First Name"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="w-[49%]">
              <InputForm
                label="Last Name"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <InputForm
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            errorMessage={emailError}
          />
        </div>

        <div className="pt-5">
          <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
            Profile Image
          </span>
          <div className="flex gap-x-10 gap-y-4 flex-col lg:flex-row pt-3">
            <div className="grow">
              <Select
                options={imageCategories}
                styles={styles}
                placeholder="Choose a category..."
                onChange={(e) => handleImageCategoryChange(e.value)}
              />
            </div>
            <div className="flex gap-4 flex-wrap">
              <Button onClick={handleGenerateImage}>Generate</Button>
              <Button
                onClick={() => {
                  setImageUrl("");
                }}
                color="white"
              >
                Reset
              </Button>
            </div>
          </div>
          <div className="pt-10">
            {
              // eslint-disable-next-line
              imageUrl ? (
                <Image src={imageUrl} alt="" width={200} height={200} />
              ) : email ? (
                <Image
                  src={`https://avatars.dicebear.com/api/initials/${email}.svg`}
                  alt=""
                  width={200}
                  height={200}
                />
              ) : (
                ""
              )
            }
          </div>
        </div>

        <div className="mt-10 flex justify-between">
          <span className="text-base leading-[1.875rem] text-text-primary dark:text-text-primary-dark">
            Dark Mode
          </span>
          <ThemeSwitcher
            isActive={isDarkModeEnabled}
            onChange={enableDarkMode}
          />
        </div>
        <div className="mt-10 flex gap-4 flex-wrap">
          <Button onClick={handleSave}>Save</Button>
          <Button
            color="white"
            onClick={() => {
              setEmail(userData.email);
              setFirstName(userData.firstName);
              setLastName(userData.lastName);
              setNickname(userData.nickname);
              setImageUrl(userData.profileImage);
            }}
          >
            Reset
          </Button>
        </div>
      </SectionLayout>
    </>
  );
};

export default Appearance;
