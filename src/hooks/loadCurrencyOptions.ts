import { useEffect, useState } from "react";
import { listQuotes } from "../api/currencyExchange";

export const useLoadCurrencyOptions = () => {
  const [currenyOptions, setCurrencyOptions] = useState<string[]>([]);

  useEffect(() => {
    listQuotes()
      .then((responseData: string[]) => {
        setCurrencyOptions(responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return currenyOptions;
};
