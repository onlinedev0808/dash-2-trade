import React from "react";

export type TooltipValueType = [HTMLElement, (value: HTMLElement) => void];

const TooltipContext = React.createContext<TooltipValueType>([null, () => {}]);

export default TooltipContext;
