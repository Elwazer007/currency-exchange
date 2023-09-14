import { useCallback, useMemo, useState } from "react";
import styles from "./styles.module.css";
import { exchange } from "../api/currencyExchange";
import { useDebounce } from "../hooks/debounce";
import CurrencySelector from "./CurrencySelector";
import { useLoadCurrencyOptions } from "../hooks/loadCurrencyOptions";
import ArrowLeftRight from "../icons/ArrowLeftRight";

const ExchangeRateContainer = () => {
  const currenyOptions = useLoadCurrencyOptions();

  const [amount, setAmount] = useState<number>(1.0);
  const [debouncedAmount, setDebouncedAmount] = useState<number>(1.0);
  const [fromCurrency, setFromCurrency] = useState<string | null>(null);
  const [toCurrency, setToCurrency] = useState<string | null>(null);

  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadResult = useCallback((from: string | null, to: string | null) => {
    if (from && to) {
      setIsLoading(true);
      exchange(from, to)
        .then((responseData: string) => {
          const rate = parseFloat(responseData);
          setExchangeRate(rate);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  const displyMessage = useMemo(() => {
    const result = `${debouncedAmount} ${fromCurrency} equals ${
      exchangeRate * debouncedAmount
    } ${toCurrency}`;

    return result;
  }, [debouncedAmount, fromCurrency, exchangeRate, toCurrency]);

  const handleChangefromCurrency = useCallback(
    (option: string) => {
      if (option === toCurrency) {
        return;
      }
      setFromCurrency(option);
      if (!toCurrency) return;
      loadResult(option, toCurrency);
    },
    [toCurrency, loadResult]
  );

  const handleChangetoCurrency = useCallback(
    (option: string) => {
      if (option === fromCurrency) {
        return;
      }
      setToCurrency(option);
      if (!fromCurrency) return;
      loadResult(fromCurrency, option);
    },
    [fromCurrency, loadResult]
  );

  const debounceFunc = () => {
    setDebouncedAmount(amount);
    if (amount) loadResult(fromCurrency, toCurrency);
  };

  const debouncedFunc = useDebounce(debounceFunc);

  const handleAmoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(parseFloat(e.target.value))) {
      setAmount(0.0);
    } else {
      setAmount(parseFloat(e.target.value));
    }
    debouncedFunc();
  };

  const handleSwap = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    loadResult(toCurrency, fromCurrency);
  }, [fromCurrency, toCurrency, loadResult]);

  const handleReset = () => {
    setAmount(1.0);
    setFromCurrency(null);
    setToCurrency(null);
    debouncedFunc();
  };

  if (currenyOptions?.length === 0) return <></>;

  return (
    <div className={styles.container}>
      <div className={styles.inputElements}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Amount</label>
          <input
            id="amount"
            type="number"
            placeholder="0.0"
            onChange={handleAmoutChange}
            value={amount === 0.0 ? "" : amount?.toString()}
          />
        </div>

        <CurrencySelector
          options={currenyOptions}
          selectedCurrency={fromCurrency}
          otherCurrency={toCurrency}
          onChange={handleChangefromCurrency}
          labelName="From"
        />

        <div className={styles.formGroup}>
          <label className={`${styles.label} ${styles.hidden}`}>Swap</label>

          <button className={styles.swap} onClick={handleSwap}>
            {" "}
            <ArrowLeftRight />
          </button>
        </div>

        <CurrencySelector
          options={currenyOptions}
          selectedCurrency={toCurrency}
          onChange={handleChangetoCurrency}
          otherCurrency={fromCurrency}
          labelName="To"
        />
      </div>
      <div
        className={`${styles.buttonWrapper} ${
          (!fromCurrency || !toCurrency || debouncedAmount == 0.0) && styles.hidden
        }`}
      >
        <button onClick={handleReset} className={styles.resetButton}>
          Reset
        </button>
      </div>

      <div
        className={`${styles.result} ${
          (isLoading === true ||
            !fromCurrency ||
            !toCurrency ||
            debouncedAmount == 0.0) &&
          styles.hidden
        }`}
      >
        {displyMessage}
      </div>
    </div>
  );
};

export default ExchangeRateContainer;
