import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DiscordSvg,
  GithubSvg,
  LinkSvg,
  MediumSvg,
  RedditSvg,
  TelegramSvg,
  TwitterSvg,
  YoutubeSvg,
} from "../CommonSvg";

export const basicColors = [
  "#5DAE6E",
  "#6E95B8",
  "#E4B640",
  "#DB6E75",
  "#9C8DAC",
  "#CFCADA",
  "#C6F0D7",
  "#446B71",
  "#E2A1CA",
  "#D57E36",
  "#D6C2B3",
  "#C3E1B2",
  "#EBCBDC",
  "#BED1D4",
  "#E4AAA9",
  "#94D5C2",
  "#997862",
];

const SocialLogo = (socialName) => {
  let icon;

  switch (socialName) {
    case "telegram":
      icon = <TelegramSvg w="0.875rem" h="0.75rem" />;
      break;
    case "twitter":
      icon = <TwitterSvg w="0.94rem" h="0.75rem" />;
      break;
    case "linkedin":
      icon = <LinkSvg />;
      break;
    case "youtube":
      icon = <YoutubeSvg />;
      break;
    case "medium":
      icon = <MediumSvg />;
      break;
    case "reddit":
      icon = <RedditSvg />;
      break;
    case "discord":
      icon = <DiscordSvg />;
      break;
    case "github":
      icon = <GithubSvg />;
      break;
  }

  return icon;
};

export default SocialLogo;

interface TagProps {
  text: string;
  className: string;
  icon?: JSX.Element;
  link: string | null;
}

export const Tag = ({ text, className, icon, link }: TagProps) => (
  <a
    href={link}
    target="_blank"
    className={`flex px-1.5 py-1 gap-1.5 items-center rounded-sm dark:text-primary ${className}`}
    rel="noreferrer"
  >
    {icon && <div className="min-w-3 w-3">{icon}</div>} {text}
  </a>
);

export const CrossSign = () => (
  <FontAwesomeIcon icon={faClose} className="w-3" />
);

export const setPrefix = (value: number) => (value > 0 ? "+" : "");
