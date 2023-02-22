import { useRouter } from "next/router";
import { useContext } from "react";
import ThemeContext, { ColorsEnum, THEMES } from "../../../theme";
import { ArrowLeft } from "../../CommonSvg";

const InnerLayout = ({ children, isMobile }) => {
  const router = useRouter();

  const [theme] = useContext(ThemeContext);
  const isLightTheme = theme === THEMES.LIGHT;

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 relative p-4 pl-0 lg:p-0 z-[1]"
        type="button"
        onClick={() => {
          router.push("/backtester");
        }}
      >
        {isMobile ? (
          <ArrowLeft />
        ) : (
          <>
            <ArrowLeft
              w={8}
              h={8}
              color={
                isLightTheme
                  ? ColorsEnum.TextSecondaryLight
                  : ColorsEnum.TextSecondaryDark
              }
            />
            <span className="text-xs text-text-secondary dark:text-text-secondary-dark">
              back
            </span>
          </>
        )}
      </button>
      {children}
    </div>
  );
};

export default InnerLayout;
