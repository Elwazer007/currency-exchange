export const listQuotes = async () => {
  const url = "https://currency-exchange.p.rapidapi.com/listquotes";
  const apiKey = import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY;

  if (apiKey === undefined) throw new Error("API key not found");

  const headers = {
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
  };

  try {
    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const exchange = async (from: string, to: string): Promise<string> => {
  const apiUrl = "https://currency-exchange.p.rapidapi.com/exchange";
  const apiKey = import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY;

  if (apiKey === undefined) throw new Error("API key not found");

  const queryParams = new URLSearchParams({
    from: from,
    to: to,
  });

  const headers = new Headers({
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
  });

  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
  };

  try {
    const response = await fetch(`${apiUrl}?${queryParams}`, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data: string = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
