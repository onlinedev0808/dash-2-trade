import { NextPage } from "next";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface IInputFormProps {
  label: string;
  placeholder: string;
  type?: string;
  name?: string;
  errorMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const InputForm: NextPage<IInputFormProps> = ({
  label,
  placeholder,
  type = "password",
  name,
  errorMessage,
  value = "",
  onChange,
  onFocus = null,
  onBlur = null,
}) => {
  const [inputType, setInputType] = useState(type);

  return (
    <div className="flex flex-col w-full gap-3 relative">
      <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
        {label}
      </span>
      <input
        type={inputType}
        placeholder={placeholder}
        className="h-[2.875rem] w-full text-sm rounded-lg pl-3.5 bg-foreground dark:bg-foreground-dark outline-none"
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {type === "password" && (
        <button
          className="absolute top-11 right-0"
          type="button"
          onClick={() => {
            if (inputType === "password") setInputType("text");
            else setInputType("password");
          }}
        >
          <FontAwesomeIcon
            icon={inputType === "password" ? faEye : faEyeSlash}
            className="w-10"
          />
        </button>
      )}
      <div className="text-red">{errorMessage}</div>
    </div>
  );
};

export default InputForm;
