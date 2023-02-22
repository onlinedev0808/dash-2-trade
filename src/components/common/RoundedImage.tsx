import React from "react";

const RoundedImage = ({
  logo,
  alt,
  className = "",
}: {
  logo: string;
  alt: string;
  className?: string;
}): JSX.Element => {
  return (
    <div className={`rounded-full overflow-hidden ${className}`}>
      <img className="w-full scale-105" src={logo} alt="token logo" />
    </div>
  );
};

export default RoundedImage;
