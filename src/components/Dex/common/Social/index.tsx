import React from "react";

import {
  LayersIcon,
  LockerIcon,
  ShareIcon,
  UnitIcon,
} from "../../../CommonSvg";
import SocialItem from "./SocialItem";

const Social = (): JSX.Element => {
  return (
    <div className="flex items-center gap-2 text-[#818EA3]">
      <SocialItem text="LayersIcon">
        <LayersIcon />
      </SocialItem>
      <SocialItem text="Owner can lock transactions" color="yellow">
        <LockerIcon />
      </SocialItem>
      <SocialItem text="ShareIcon">
        <ShareIcon />
      </SocialItem>
      <SocialItem text="UnitIcon">
        <UnitIcon />
      </SocialItem>
    </div>
  );
};

export default Social;
