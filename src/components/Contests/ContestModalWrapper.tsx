import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function createPortalRoot(portalId) {
  const drawerRoot = document.createElement("div");
  drawerRoot.setAttribute("id", portalId);

  return drawerRoot;
}

const ContestModalWrapper = forwardRef(
  ({ children }: { children: ReactNode }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const portalId = `modal-${uuidv4()}`;
    const bodyRef = useRef(document.querySelector("body"));
    const portalRootRef = useRef(
      document.getElementById(portalId) || createPortalRoot(portalId)
    );

    useImperativeHandle(ref, () => ({
      openModal() {
        setIsOpen(true);
      },
      closeModal() {
        setIsOpen(false);
      },
    }));

    useEffect(() => {
      const portal = portalRootRef.current;
      const bodyEl = bodyRef.current;

      if (isOpen) {
        bodyRef.current.appendChild(portalRootRef.current);
      } else {
        portalRootRef.current.remove();
      }

      return () => {
        portal.remove();
        bodyEl.style.overflow = "";
      };
    }, [isOpen]);

    /*useEffect(() => {
      bodyRef.current.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);*/

    useEffect(() => {
      const onKeyPress = (e) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        window.addEventListener("keyup", onKeyPress);
      }

      return () => {
        window.removeEventListener("keyup", onKeyPress);
      };
    }, [isOpen, setIsOpen]);

    if (!isOpen) return null;

    return createPortal(
      <div aria-hidden={isOpen ? "false" : "true"}>
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/50 backdrop-blur-sm flex"
          onClick={() => setIsOpen(false)}
        />
        <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-50">
          {children}
        </div>
      </div>,
      portalRootRef.current
    );
  }
);

export default ContestModalWrapper;
