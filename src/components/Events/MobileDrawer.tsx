import { ReactNode } from "react";
import Drawer, { PositionEnum } from "../common/Drawer/Drawer";
import { CloseSvg } from "../CommonSvg";

const MobileDrawer = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  onClose: () => void;
}) => {
  return (
    <Drawer
      position={PositionEnum.Bottom}
      isOpen={isOpen}
      onClose={onClose}
      className="rounded-t-3xl border-t-1 border-separator-blue bg-white dark:bg-background-secondary-dark overflow-hidden h-[70vh]"
      removeWhenClosed
    >
      <div className="py-12 px-6">
        <div className="flex justify-between items-center">
          <h3 className="dark:text-white text-3xl">{title}</h3>
          <button
            type="button"
            className="bg-background-light-dark p-3 rounded"
            onClick={onClose}
          >
            <CloseSvg />
          </button>
        </div>

        <div className="mt-10">{children}</div>
      </div>
    </Drawer>
  );
};

export default MobileDrawer;
