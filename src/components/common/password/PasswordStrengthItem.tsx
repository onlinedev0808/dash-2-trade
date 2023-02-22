import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const PasswordStrengthItem = ({ title, passed = false }) => (
  <li className="grid grid-cols-[1rem_minmax(0,_1fr)] gap-1.5">
    {passed ? (
      <FontAwesomeIcon icon={faCheck} className="text-green self-center" />
    ) : (
      <div className="h-[0.875rem] flex items-center translate-y-[25%]">
        <div className="w-2 h-2 bg-text-primary dark:bg-text-primary-dark rounded-full" />
      </div>
    )}
    <span className="text-sm">{title}</span>
  </li>
);

export default PasswordStrengthItem;
