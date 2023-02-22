import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import {
  FacebookSvg,
  InstagramSvg,
  LinkedInSvg,
  TwitterSvg,
} from "../../CommonSvg";

const Social = ({ url, svg }) => (
  <Link href={url}>
    <div className="text-text-primary dark:text-white w-5 h-5 flex items-center justify-center">
      {svg}
    </div>
  </Link>
);

export const HeadSection = ({
  title,
  headText = "",
  headIcon = null,
  description = "",
  child = null,
  hideSocialLinks = false,
  classes = "",
}) => (
  <section
    className={`flex flex-wrap justify-center text-center mb-7 ${classes}`}
  >
    <div className="w-full text-xl text-button-primary mb-5">
      <h1 className="absolute top-revertMainTop text-[0px]" id="overview">
        Overview
      </h1>
      {headIcon}
      {headText}
    </div>
    <h1 className="w-full text-4xl mb-10 ">{title}</h1>
    {!hideSocialLinks && (
      <div className="flex justify-center gap-5 w-full mb-11">
        <Social url="" svg={<LinkedInSvg />} />
        <Social url="" svg={<FacebookSvg />} />
        <Social url="" svg={<TwitterSvg />} />
        <Social url="" svg={<InstagramSvg />} />
      </div>
    )}

    {description && (
      <p className="text-base text-text-secondary dark:text-text-secondary-dark mb-11">
        {description}
      </p>
    )}
    {child}
  </section>
);

export const TextWithImageSection = ({
  title,
  text,
  hId = null,
  image = null,
  className = "",
}) => (
  <section className={`flex gap-0 md:gap-[5.6rem] items-center ${className}`}>
    <div>
      <div className="text-3xl mb-7 relative">
        {hId && (
          <h2 id={hId} className="absolute top-revertMainTop left-0 text-[0px]">
            {title}
          </h2>
        )}
        {title}
      </div>
      <p className="text-base text-text-secondary dark:text-text-secondary-dark whitespace-pre-line">
        {text}
      </p>
    </div>
    {image && (
      <div className="hidden md:block min-w-[15rem] image-container">
        <Image src={image} className="rounded-2xl " />
      </div>
    )}
  </section>
);

export const IconTextSection = ({ icon, title, text }) => (
  <section className="flex flex-col">
    <div
      className="mb-5 w-[3.2rem] h-[3.2rem]
     flex items-center justify-center
     bg-foreground dark:bg-foreground-dark
     rounded-[8px]
     "
    >
      {icon}
    </div>
    <h4 className="text-[1.4rem] mb-8">{title}</h4>
    <p className="text-base text-text-secondary dark:text-text-secondary-dark whitespace-pre-line">
      {text}
    </p>
  </section>
);

export const WarningBox = ({ text = null, btnTitle = null }) => (
  <div
    className="flex justify-center flex-wrap
                       gap-7 px-[3.8rem] py-[7.7rem]
                       bg-foreground dark:bg-foreground-highlight-dark
                       rounded-3xl
          "
  >
    <p
      className="w-[160px] w-full flex items-center justify-center items-center text-base
          bg-highlight dark:bg-highlight-secondary-dark
          py-2 px-4 rounded-lg text-text-primary dark:text-text-primary-dark"
    >
      {btnTitle ?? "Keep in mind"}
    </p>
    <p className="w-full text-center">
      {text ??
        ` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi.`}
    </p>
  </div>
);

export const CannotFindBox = ({ title = "Cannot find the answer?" }) => (
  <div
    className="flex justify-center
                       gap-y-7
                       px-8 md:px-[3.8rem] py-8 md:py-[7.7rem]
                       bg-foreground dark:bg-foreground-highlight-dark
                       rounded-3xl
          "
  >
    <div className="flex flex-col items-center gap-12">
      <div
        className="flex justify-center flex-wrap gap-5
                              text-base text-text-secondary dark:text-text-secondary-dark"
      >
        <h3 className="w-full text-center text-xl text-text-primary dark:text-text-primary-dark">
          {title}
        </h3>
        We are always glad to help! Check our FAQs page or get in touch with our
        team
      </div>
      <span className="flex gap-4">
        <button
          className="flex items-center justify-center items-center
                           bg-button-primary py-4 px-[3.8rem] rounded-lg
                           text-base text-text-primary-dark"
        >
          Go to FAQs
        </button>
        <button
          className="flex items-center justify-center items-center
                           border-1 border-white border-primary py-4 px-[3.8rem] rounded-lg
                           text-base text-text-primary dark:text-text-primary-dark"
        >
          Get in touch
        </button>
      </span>
    </div>
  </div>
);

export const CheckBox = ({ id = null, title, isChecked = true }) => {
  const [checked, setChecked] = useState(isChecked);
  const handleChange = () => {
    // setChecked ((prev) => !prev);
  };

  return (
    <div className="grid grid-cols-[16px_1fr] gap-x-2 ">
      <input
        id={id ?? title}
        type="checkbox"
        checked={checked}
        className="w-5 h-5 pointer-events-none"
        onChange={handleChange}
      />
      <label
        htmlFor={id ?? title}
        className=" font-medium text-gray-900 dark:text-gray-300"
      >
        {title}
      </label>
    </div>
  );
};
