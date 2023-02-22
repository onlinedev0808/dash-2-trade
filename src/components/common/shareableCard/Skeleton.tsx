import React from "react";
import { QuantfinityLogo } from "../../CommonSvg";
import RoundedImage from "../RoundedImage";

const Skeleton = ({ children, title, subtitle, logo = null }): JSX.Element => (
  <div className="flex flex-col gap-5 relative mb:mt-5 w-full">
    <div className="flex flex-col md:flex-row gap-3 md:gap-6 md:items-center w-full">
      {logo && (
        <RoundedImage
          logo={logo}
          alt={title}
          className="w-[30%] max-w-[10rem]"
        />
      )}
      <div className="flex gap-x-3 items-center flex-wrap">
        <h2 className="text-text-primary dark:text-text-primary-dark text-2xl md:text-3xl">
          {title}
        </h2>
        <h3 className="text-text-primary dark:text-text-primary-dark text-2xl md:text-3xl">
          {subtitle}
        </h3>
      </div>
    </div>
    <div>{children}</div>
    <div className="flex justify-between items-center grow">
      <QuantfinityLogo />
    </div>
  </div>
);

export default Skeleton;
