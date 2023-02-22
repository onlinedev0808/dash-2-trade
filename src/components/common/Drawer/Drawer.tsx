import { useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";

import useMountTransition from "../../../hooks/useMountTransition";

import classes from "./Drawer.module.scss";

function createPortalRoot(portalId) {
  const drawerRoot = document.createElement("div");
  drawerRoot.setAttribute("id", portalId);

  return drawerRoot;
}

export enum PositionEnum {
  Right = "right",
  Left = "left",
  Top = "top",
  Bottom = "bottom",
}

interface IDrawer {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  position:
    | PositionEnum.Right
    | PositionEnum.Left
    | PositionEnum.Bottom
    | PositionEnum.Top;
  className?: string;
  removeWhenClosed?: boolean;
}

const Drawer = ({
  isOpen,
  children,
  onClose,
  className = "",
  position = PositionEnum.Left,
  removeWhenClosed = true,
}: IDrawer) => {
  const portalId = `drawer-root-${uuidv4()}`;
  const bodyRef = useRef(document.querySelector("body"));
  const portalRootRef = useRef(
    document.getElementById(portalId) || createPortalRoot(portalId)
  );
  const isTransitioning = useMountTransition(isOpen, 300);

  useEffect(() => {
    bodyRef.current.appendChild(portalRootRef.current);
    const portal = portalRootRef.current;
    const bodyEl = bodyRef.current;

    return () => {
      portal.remove();
      bodyEl.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const updatePageScroll = () => {
      bodyRef.current.style.overflow = isOpen ? "hidden" : "";
    };

    updatePageScroll();
  }, [isOpen]);

  useEffect(() => {
    const onKeyPress = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keyup", onKeyPress);
    }

    return () => {
      window.removeEventListener("keyup", onKeyPress);
    };
  }, [isOpen, onClose]);

  if (!isTransitioning && removeWhenClosed && !isOpen) {
    return null;
  }

  return createPortal(
    <div
      aria-hidden={isOpen ? "false" : "true"}
      className={`${classes["drawer-container"]} ${isOpen && classes.open} 
      ${isTransitioning && classes.in}`}
    >
      <div
        className={`min:w-[20%] ${classes.drawer} ${classes[position]} ${className}`}
        role="dialog"
      >
        {children}
      </div>
      <div className={`${classes.backdrop}`} onClick={onClose} />
    </div>,
    portalRootRef.current
  );
};

export default Drawer;
