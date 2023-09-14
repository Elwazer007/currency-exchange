import React, { useState, useRef, useCallback } from "react";
import ArrowIcon from "../../icons/DownArrow";
import styles from "./styles.module.css";

interface CustomSelectProps {
  options: string[];
  selectedOption: string | null;
  onChange: (option: string) => void;
  optionDisabled?: string | null;
}

const CustomSelect = ({
  options,
  selectedOption,
  onChange,
  optionDisabled,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    if (option === optionDisabled) {
      return;
    }
    onChange(option);
    setIsOpen(false);
  };

  const handleDocumentClick = useCallback(
    (e: MouseEvent) => {
      if (
        isOpen &&
        selectRef.current &&
        !selectRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  React.useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [handleDocumentClick]);

  return (
    <div className={styles.customSelect} ref={selectRef}>
      <div
        className={`${styles.customSelectToggle} ${
          isOpen ? `${styles.open}` : ""
        }`}
        onClick={handleToggleDropdown}
      >
        {selectedOption ? selectedOption : "Currency"}
        <ArrowIcon />
      </div>
      {isOpen && (
        <ul className={styles.customSelectOptions}>
          {options.map((option) => (
            <li
              key={option}
              className={`${styles.customSelectOption} ${
                option === optionDisabled ? `${styles.disabled}` : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
