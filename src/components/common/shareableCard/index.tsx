import React, { useState, useRef } from "react";
import domtoimage from "dom-to-image";
import { DownloadSvg, ShareSvg } from "../../CommonSvg";
// import { ShareSocial } from "react-share-social";
import ModalWrapper from "../ModalWrapper";

// const isLightTheme = true;

// const style = {
//   root: {
//     background: "transparent",
//     color: "inherit",
//     width: "100%",
//   },
//   copyContainer: {
//     background: isLightTheme ? "#DCD4EF" : "#1E1F24",
//   },
//   copyUrl: {
//     color: "black",
//   },
//   title: {
//     color: "inherit",
//   },
// };

const ShareableCard = ({
  children,
  tokenName = "D2T token",
  className = "",
}): JSX.Element => {
  const [isOpened, setIsOpened] = useState(false);
  const ref = useRef(null);
  return (
    <>
      <button className="w-5" onClick={() => setIsOpened(true)}>
        <ShareSvg />
      </button>
      {isOpened && (
        <ModalWrapper onClick={() => setIsOpened(false)}>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={`w-10/12 md:w-9/12 flex flex-col gap-5 py-3 md:py-6 bg-foreground dark:bg-foreground-dark rounded-xl my-auto mx-auto text-text-primary dark:text-text-primary-dark flex flex-col border-1 border-white items-center max-h-[90%] overflow-y-scroll ${className}`}
          >
            <div
              ref={ref}
              className="w-full bg-foreground dark:bg-foreground-dark px-4 py-0 md:px-12 md:py-3"
              id="test"
            >
              {children}
            </div>
            <button
              className="text-base leading-5 text-white bg-button-primary px-2 py-2 rounded hover:bg-highlight-button-primary hidden lg:flex items-center justify-center gap-5 duration-300 w-[2rem]"
              onClick={() => {
                domtoimage
                  .toBlob(ref.current, {
                    style: {
                      "border-top": "1px solid white",
                      "border-right": "1px solid white",
                      "border-left": "1px solid white",
                      "border-bottom": "1px solid white",
                      "border-radius": "0.75rem",
                    },
                  })
                  .then((blob) => {
                    const link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.download = `${tokenName}.png`;
                    link.click();
                  });
              }}
            >
              <DownloadSvg />
            </button>
            {/* <ShareSocial
          url={window?.location?.href}
          socialTypes={["telegram"]}
          onSocialButtonClicked={(data) => console.log(data)}
          style={style}
        /> */}
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default ShareableCard;
