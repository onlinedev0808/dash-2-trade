import Tooltip from "./Tooltip";

const Card = ({
  title = "",
  icon = null,
  children,
  classes = "",
  hasTooltip = false,
  tooltipTitle = "",
  tooltpMessage = null,
  hasBorder = false,
}) => (
  <div
    className={`rounded-card p-3 md:p-4 bg-foreground dark:bg-foreground-dark text-text-primary dark:text-text-primary-dark w-full ${classes}`}
  >
    {title && (
      <div
        className={`flex justify-between ${
          hasBorder && "border-b-solid border-b-1 border-border-primary mb-5"
        }`}
      >
        <div className="flex gap-2 items-center mb-5 md:mb-6">
          {icon}
          <h3 className="text-base md:text-lg card-title">{title}</h3>
        </div>
        <div>
          {hasTooltip && (
            <Tooltip
              title={tooltipTitle}
              message={tooltpMessage}
              icon
              tooltipContentClassname="lg:min-w-max"
            />
          )}
        </div>
      </div>
    )}

    {children}
  </div>
);

export default Card;
