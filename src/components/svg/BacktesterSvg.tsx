import { useContext } from "react";
import ThemeContext, { ColorsEnum, THEMES } from "../../theme";

export const NoStrategiesIcon = () => {
  const [theme] = useContext(ThemeContext);
  const isLightTheme = theme === THEMES.LIGHT;

  return (
    <svg
      width="209"
      height="174"
      viewBox="0 0 209 174"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M172.5 87C172.5 134.358 134.108 172.75 86.75 172.75C39.3916 172.75 1 134.358 1 87C1 39.6416 39.3916 1.25 86.75 1.25C134.108 1.25 172.5 39.6416 172.5 87Z"
        fill={isLightTheme ? "#F1F3FF" : "#202538"}
        stroke="#1D1E2C"
      />
      <path
        d="M47.65 39.8496H202.9C204.425 39.8496 205.888 40.4554 206.966 41.5337C208.044 42.6121 208.65 44.0746 208.65 45.5996V74.3496C208.65 75.8746 208.044 77.3371 206.966 78.4155C205.888 79.4938 204.425 80.0996 202.9 80.0996H47.65C46.125 80.0996 44.6625 79.4938 43.5842 78.4155C42.5058 77.3371 41.9 75.8746 41.9 74.3496V45.5996C41.9 44.0746 42.5058 42.6121 43.5842 41.5337C44.6625 40.4554 46.125 39.8496 47.65 39.8496V39.8496Z"
        fill={isLightTheme ? "#D5DFFF" : "#313456"}
      />
      <path
        d="M121.25 49.0498H91.35C89.4446 49.0498 87.9 50.5944 87.9 52.4998C87.9 54.4052 89.4446 55.9498 91.35 55.9498H121.25C123.155 55.9498 124.7 54.4052 124.7 52.4998C124.7 50.5944 123.155 49.0498 121.25 49.0498Z"
        fill={isLightTheme ? "#313456" : "white"}
      />
      <path
        d="M141.95 64H91.35C89.4446 64 87.9 65.5446 87.9 67.45C87.9 69.3554 89.4446 70.9 91.35 70.9H141.95C143.855 70.9 145.4 69.3554 145.4 67.45C145.4 65.5446 143.855 64 141.95 64Z"
        fill={isLightTheme ? "#313456" : "white"}
      />
      <path
        d="M77.275 60.1375C77.275 52.3296 70.9454 46 63.1375 46C55.3296 46 49 52.3296 49 60.1375C49 67.9454 55.3296 74.275 63.1375 74.275C70.9454 74.275 77.275 67.9454 77.275 60.1375Z"
        fill="#5367FE"
      />
      <g clipPath="url(#clip0_772_10403)">
        <path
          d="M65.0875 59.1623H56.3125V60.6248H65.0875V59.1623ZM65.0875 56.2373H56.3125V57.6998H65.0875V56.2373ZM56.3125 63.5498H62.1625V62.0873H56.3125V63.5498ZM70.5719 60.2592L71.6688 61.3561L66.5573 66.4748L63.2594 63.1842L64.3563 62.0873L66.5573 64.2811L70.5719 60.2592Z"
          fill="white"
        />
      </g>
      <path
        d="M185.65 91.5996H30.4C27.2244 91.5996 24.65 94.174 24.65 97.3496V126.1C24.65 129.275 27.2244 131.85 30.4 131.85H185.65C188.826 131.85 191.4 129.275 191.4 126.1V97.3496C191.4 94.174 188.826 91.5996 185.65 91.5996Z"
        fill={isLightTheme ? "#D5DFFF" : "#313456"}
      />
      <path
        d="M104 100.8H74.1C72.1946 100.8 70.65 102.344 70.65 104.25C70.65 106.155 72.1946 107.7 74.1 107.7H104C105.905 107.7 107.45 106.155 107.45 104.25C107.45 102.344 105.905 100.8 104 100.8Z"
        fill={isLightTheme ? "#313456" : "white"}
      />
      <path
        d="M124.7 115.75H74.1C72.1946 115.75 70.65 117.295 70.65 119.2C70.65 121.105 72.1946 122.65 74.1 122.65H124.7C126.605 122.65 128.15 121.105 128.15 119.2C128.15 117.295 126.605 115.75 124.7 115.75Z"
        fill={isLightTheme ? "#313456" : "white"}
      />
      <path
        d="M60.275 112.138C60.275 104.33 53.9454 98 46.1375 98C38.3296 98 32 104.33 32 112.138C32 119.945 38.3296 126.275 46.1375 126.275C53.9454 126.275 60.275 119.945 60.275 112.138Z"
        fill="#5367FE"
      />
      <g clipPath="url(#clip1_772_10403)">
        <path
          d="M48.0875 111.162H39.3125V112.625H48.0875V111.162ZM48.0875 108.237H39.3125V109.7H48.0875V108.237ZM39.3125 115.55H45.1625V114.087H39.3125V115.55ZM53.5719 112.259L54.6688 113.356L49.5573 118.475L46.2594 115.184L47.3563 114.087L49.5573 116.281L53.5719 112.259Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_772_10403">
          <rect
            width="17.55"
            height="17.55"
            fill="white"
            transform="translate(54.85 51.8496)"
          />
        </clipPath>
        <clipPath id="clip1_772_10403">
          <rect
            width="17.55"
            height="17.55"
            fill="white"
            transform="translate(37.85 103.85)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const StrategySvg = () => {
  const [theme] = useContext(ThemeContext);
  const isLightTheme = theme === THEMES.LIGHT;

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="40"
        height="40"
        rx="20"
        fill={isLightTheme ? "#D4DFFF" : "#35416D"}
      />
      <g clipPath="url(#clip0_772_10247)">
        <path
          d="M22 18H10V20H22V18ZM22 14H10V16H22V14ZM10 24H18V22H10V24ZM29.5 19.5L31 21L24.01 28L19.5 23.5L21 22L24.01 25L29.5 19.5Z"
          fill={isLightTheme ? ColorsEnum.TextLightPrimary : "white"}
        />
      </g>
      <defs>
        <clipPath id="clip0_772_10247">
          <rect
            width="24"
            height="24"
            fill={isLightTheme ? ColorsEnum.TextLightPrimary : "white"}
            transform="translate(8 8)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const StepSeparator = () => (
  <svg
    width="39"
    height="4"
    viewBox="0 0 39 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.8">
      <circle cx="1.5" cy="2" r="1.5" fill="#383C4A" />
      <circle cx="7.5" cy="2" r="1.5" fill="#383C4A" />
      <circle cx="13.5" cy="2" r="1.5" fill="#383C4A" />
      <circle cx="19.5" cy="2" r="1.5" fill="#383C4A" />
      <circle cx="25.5" cy="2" r="1.5" fill="#383C4A" />
      <circle cx="31.5" cy="2" r="1.5" fill="#383C4A" />
      <circle cx="37.5" cy="2" r="1.5" fill="#383C4A" />
    </g>
  </svg>
);

export const StepSeparatorCompleted = () => (
  <svg
    width="39"
    height="2"
    viewBox="0 0 39 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="fill-text-primary dark:fill-[#333438]"
  >
    <rect width="39" height="2" rx="1" fill="" />
  </svg>
);

export const TrashCan = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-text-primary dark:stroke-text-primary-dark"
  >
    <path
      d="M2.25 4.5H3.75H15.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 4.5V3C6 2.60218 6.15804 2.22064 6.43934 1.93934C6.72064 1.65804 7.10218 1.5 7.5 1.5H10.5C10.8978 1.5 11.2794 1.65804 11.5607 1.93934C11.842 2.22064 12 2.60218 12 3V4.5M14.25 4.5V15C14.25 15.3978 14.092 15.7794 13.8107 16.0607C13.5294 16.342 13.1478 16.5 12.75 16.5H5.25C4.85218 16.5 4.47064 16.342 4.18934 16.0607C3.90804 15.7794 3.75 15.3978 3.75 15V4.5H14.25Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SaveSvg = ({ w = "1.25rem", h = "1.25rem" }) => (
  <svg
    width={w}
    height={h}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_772_9299)">
      <path
        d="M14.6667 2.5H4.66667C3.74167 2.5 3 3.25 3 4.16667V15.8333C3 16.75 3.74167 17.5 4.66667 17.5H16.3333C17.25 17.5 18 16.75 18 15.8333V5.83333L14.6667 2.5ZM10.5 15.8333C9.11667 15.8333 8 14.7167 8 13.3333C8 11.95 9.11667 10.8333 10.5 10.8333C11.8833 10.8333 13 11.95 13 13.3333C13 14.7167 11.8833 15.8333 10.5 15.8333ZM13 7.5H4.66667V4.16667H13V7.5Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_772_9299">
        <rect width="20" height="20" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);

export const CloseSvg = () => (
  <svg
    width="16"
    height="15"
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.75 3.75L4.25 11.25"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.25 3.75L11.75 11.25"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MenuSvg = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.666748 8H15.3334"
      stroke="#7A7F93"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M0.666748 2.66699H15.3334"
      stroke="#7A7F93"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M0.666748 13.334H15.3334"
      stroke="#7A7F93"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PresetSvg = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-text-primary dark:stroke-text-primary-dark"
  >
    <path
      d="M2.66675 13.9997V9.33301"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M2.66675 6.66667V2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 14V8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 5.33333V2" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M13.3333 14.0003V10.667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M13.3333 8V2" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M0.666748 9.33301H4.66675"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M6 5.33301H10" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M11.3333 10.667H15.3333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EyeSvg = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.666748 8.00033C0.666748 8.00033 3.33341 2.66699 8.00008 2.66699C12.6667 2.66699 15.3334 8.00033 15.3334 8.00033C15.3334 8.00033 12.6667 13.3337 8.00008 13.3337C3.33341 13.3337 0.666748 8.00033 0.666748 8.00033Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PlaySvg = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2225_1366)">
      <path
        d="M8.00004 14.6663C11.6819 14.6663 14.6667 11.6816 14.6667 7.99967C14.6667 4.31778 11.6819 1.33301 8.00004 1.33301C4.31814 1.33301 1.33337 4.31778 1.33337 7.99967C1.33337 11.6816 4.31814 14.6663 8.00004 14.6663Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66663 5.33301L10.6666 7.99967L6.66663 10.6663V5.33301Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2225_1366">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const ClockSvg = () => (
  <svg
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.49998 14.6663C12.1819 14.6663 15.1666 11.6816 15.1666 7.99967C15.1666 4.31778 12.1819 1.33301 8.49998 1.33301C4.81808 1.33301 1.83331 4.31778 1.83331 7.99967C1.83331 11.6816 4.81808 14.6663 8.49998 14.6663Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 4V8L11.1667 9.33333"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TickSvg = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 2.75L3.875 6.875L2 5"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TrendingUp = () => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.3337 4.5L9.00033 10.8333L5.66699 7.5L0.666992 12.5"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.333 4.5H15.333V8.5"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TrendingDown = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.3337 12L9.00033 5.66667L5.66699 9L0.666992 4"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.333 12H15.333V8"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowUp = ({ color }) => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-text-secondary dark:stroke-text-secondary-dark"
  >
    <path
      d="M8 13.1663V3.83301"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.33301 8.49967L7.99967 3.83301L12.6663 8.49967"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowDown = ({ color }) => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-text-secondary dark:stroke-text-secondary-dark"
  >
    <path
      d="M8 3.83366L8 13.167"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.667 8.50033L8.00033 13.167L3.33366 8.50032"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const OpenArrowSvg = () => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 13.1663V3.83301"
      stroke="#4BC67C"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.33301 8.49967L7.99967 3.83301L12.6663 8.49967"
      stroke="#4BC67C"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CloseArrowSvg = () => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 3.83366L8 13.167"
      stroke="#7A7F93"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.667 8.50033L8.00033 13.167L3.33366 8.50032"
      stroke="#7A7F93"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ReportSvg = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2324_1977)">
      <path
        d="M7.99992 14.6663C11.6818 14.6663 14.6666 11.6816 14.6666 7.99967C14.6666 4.31778 11.6818 1.33301 7.99992 1.33301C4.31802 1.33301 1.33325 4.31778 1.33325 7.99967C1.33325 11.6816 4.31802 14.6663 7.99992 14.6663Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 5.33301V7.99967"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10.667H8.00667"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2324_1977">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const GearSvg = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1924_31998)">
      <path
        d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.9327 10.0003C12.8439 10.2014 12.8175 10.4245 12.8567 10.6407C12.8959 10.857 12.999 11.0565 13.1527 11.2137L13.1927 11.2537C13.3167 11.3775 13.415 11.5245 13.4821 11.6864C13.5492 11.8483 13.5837 12.0218 13.5837 12.197C13.5837 12.3722 13.5492 12.5457 13.4821 12.7076C13.415 12.8694 13.3167 13.0165 13.1927 13.1403C13.0689 13.2643 12.9218 13.3626 12.7599 13.4297C12.5981 13.4968 12.4246 13.5314 12.2493 13.5314C12.0741 13.5314 11.9006 13.4968 11.7388 13.4297C11.5769 13.3626 11.4298 13.2643 11.306 13.1403L11.266 13.1003C11.1089 12.9466 10.9093 12.8435 10.6931 12.8043C10.4768 12.7651 10.2538 12.7916 10.0527 12.8803C9.8555 12.9648 9.68734 13.1052 9.56889 13.284C9.45044 13.4629 9.38687 13.6725 9.38602 13.887V14.0003C9.38602 14.3539 9.24554 14.6931 8.99549 14.9431C8.74544 15.1932 8.4063 15.3337 8.05268 15.3337C7.69906 15.3337 7.35992 15.1932 7.10987 14.9431C6.85982 14.6931 6.71935 14.3539 6.71935 14.0003V13.9403C6.71419 13.7197 6.64276 13.5057 6.51436 13.3261C6.38595 13.1466 6.20651 13.0098 5.99935 12.9337C5.79827 12.8449 5.57522 12.8184 5.35896 12.8577C5.14269 12.8969 4.94313 13 4.78602 13.1537L4.74602 13.1937C4.62218 13.3176 4.47513 13.416 4.31327 13.4831C4.1514 13.5502 3.9779 13.5847 3.80268 13.5847C3.62746 13.5847 3.45396 13.5502 3.2921 13.4831C3.13023 13.416 2.98318 13.3176 2.85935 13.1937C2.73538 13.0698 2.63703 12.9228 2.56994 12.7609C2.50284 12.599 2.4683 12.4255 2.4683 12.2503C2.4683 12.0751 2.50284 11.9016 2.56994 11.7397C2.63703 11.5779 2.73538 11.4308 2.85935 11.307L2.89935 11.267C3.05304 11.1099 3.15614 10.9103 3.19535 10.6941C3.23456 10.4778 3.20809 10.2547 3.11935 10.0537C3.03484 9.85648 2.89452 9.68831 2.71566 9.56986C2.5368 9.45141 2.32721 9.38785 2.11268 9.38699H1.99935C1.64573 9.38699 1.30659 9.24652 1.05654 8.99647C0.806491 8.74642 0.666016 8.40728 0.666016 8.05366C0.666016 7.70004 0.806491 7.3609 1.05654 7.11085C1.30659 6.8608 1.64573 6.72033 1.99935 6.72033H2.05935C2.28001 6.71516 2.49402 6.64374 2.67355 6.51533C2.85308 6.38693 2.98983 6.20748 3.06602 6.00033C3.15476 5.79925 3.18123 5.5762 3.14202 5.35993C3.10281 5.14367 2.99971 4.94411 2.84602 4.78699L2.80602 4.74699C2.68205 4.62316 2.5837 4.47611 2.5166 4.31425C2.4495 4.15238 2.41497 3.97888 2.41497 3.80366C2.41497 3.62844 2.4495 3.45494 2.5166 3.29307C2.5837 3.13121 2.68205 2.98416 2.80602 2.86033C2.92985 2.73636 3.0769 2.63801 3.23876 2.57091C3.40063 2.50381 3.57413 2.46928 3.74935 2.46928C3.92457 2.46928 4.09807 2.50381 4.25994 2.57091C4.4218 2.63801 4.56885 2.73636 4.69268 2.86033L4.73268 2.90033C4.8898 3.05402 5.08936 3.15712 5.30562 3.19633C5.52189 3.23554 5.74494 3.20907 5.94602 3.12033H5.99935C6.19653 3.03582 6.36469 2.8955 6.48314 2.71664C6.60159 2.53778 6.66516 2.32818 6.66602 2.11366V2.00033C6.66602 1.6467 6.80649 1.30756 7.05654 1.05752C7.30659 0.807468 7.64573 0.666992 7.99935 0.666992C8.35297 0.666992 8.69211 0.807468 8.94216 1.05752C9.19221 1.30756 9.33268 1.6467 9.33268 2.00033V2.06033C9.33354 2.27485 9.3971 2.48444 9.51555 2.6633C9.634 2.84216 9.80217 2.98248 9.99935 3.06699C10.2004 3.15574 10.4235 3.18221 10.6397 3.143C10.856 3.10378 11.0556 3.00068 11.2127 2.84699L11.2527 2.80699C11.3765 2.68302 11.5236 2.58468 11.6854 2.51758C11.8473 2.45048 12.0208 2.41594 12.196 2.41594C12.3712 2.41594 12.5447 2.45048 12.7066 2.51758C12.8685 2.58468 13.0155 2.68302 13.1393 2.80699C13.2633 2.93082 13.3617 3.07787 13.4288 3.23974C13.4959 3.4016 13.5304 3.5751 13.5304 3.75033C13.5304 3.92555 13.4959 4.09905 13.4288 4.26091C13.3617 4.42278 13.2633 4.56983 13.1393 4.69366L13.0993 4.73366C12.9457 4.89078 12.8426 5.09034 12.8033 5.3066C12.7641 5.52286 12.7906 5.74591 12.8793 5.94699V6.00033C12.9639 6.1975 13.1042 6.36567 13.283 6.48412C13.4619 6.60257 13.6715 6.66614 13.886 6.66699H13.9993C14.353 6.66699 14.6921 6.80747 14.9422 7.05752C15.1922 7.30756 15.3327 7.6467 15.3327 8.00033C15.3327 8.35395 15.1922 8.69309 14.9422 8.94313C14.6921 9.19318 14.353 9.33366 13.9993 9.33366H13.9393C13.7248 9.33451 13.5152 9.39808 13.3364 9.51653C13.1575 9.63498 13.0172 9.80315 12.9327 10.0003V10.0003Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1924_31998">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const TabIcon = ({ icon, color }) => {
  switch (icon) {
    case "ArrowUp":
      return <ArrowUp color={color} />;
    case "ArrowDown":
      return <ArrowDown color={color} />;
    default:
      return <ArrowUp color={color} />;
  }
};
