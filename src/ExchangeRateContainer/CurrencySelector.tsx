import React from "react";

import styles from "./styles.module.css";

import CustomSelect from "../components/Dropdown";

interface CurrencySelectorProps {
  options: string[];
  selectedCurrency: string | null;
  otherCurrency: string | null;
  onChange: (option: string) => void;
  labelName: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  options,
  selectedCurrency,
  otherCurrency,
  onChange,
  labelName,
}) => {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>{labelName}</label>

      <CustomSelect
        selectedOption={selectedCurrency}
        options={options}
        onChange={onChange}
        optionDisabled={otherCurrency}
      />
    </div>
  );
};

export default React.memo(CurrencySelector);
