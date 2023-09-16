import { render, fireEvent } from "@testing-library/react";
import ExchangeRateContainer from "../ExchangeRateContainer";
import "@testing-library/jest-dom";

jest.mock("../hooks/loadCurrencyOptions");
jest.mock("../api/currencyExchange");

jest.mock("../hooks/debounce", () => ({
  useDebounce: (callback: () => void) => callback,
}));

describe("ExchangeRateContainer", () => {
  it("renders without errors", () => {
    const { container } = render(<ExchangeRateContainer />);
    expect(container).toBeInTheDocument();
  });

  it("updates the amount when the input value changes", () => {
    const { getByPlaceholderText } = render(<ExchangeRateContainer />);
    const input = getByPlaceholderText("0.0") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "50" } });
    expect(input.value).toBe("50");
  });
});
