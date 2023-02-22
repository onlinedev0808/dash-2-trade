import { useState } from "react";
import Button from "../../common/Button";
import { EditSvg } from "../../CommonSvg";
import Input from "./common/Input";

const StepLayout = ({
  title,
  children,
  isMobile,
  isEditable = false,
  onChange = null,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="flex gap-[inherit] flex-col items-center grow">
      {!isMobile && (
        <div className="flex items-center gap-3">
          {isEditing ? (
            <Input
              label=""
              placeholder=""
              value={title}
              onChange={(e) => onChange(e.target.value)}
              name="nickname"
            />
          ) : (
            <h2 className="text-2xl">{title}</h2>
          )}

          {isEditable && (
            <Button
              color="transparent"
              onClick={() => setIsEditing(!isEditing)}
            >
              <EditSvg />
            </Button>
          )}
        </div>
      )}
      <div className="w-full flex flex-col items-center">{children}</div>
    </div>
  );
};

export default StepLayout;
