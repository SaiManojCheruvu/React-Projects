import React, { useEffect, useState } from "react";

const App: React.FC = () => {
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [output, setOutput] = useState<number | null>(null);

  useEffect((): void => {
    const getCurrencyData = async (): Promise<void> => {
      if (from && to && amount !== null) {
        try {
          const res: Response = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
          );

          if (!res.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await res.json();
          if (to in data.rates) {
            setOutput(data.rates[to]);
          } else {
            setOutput(null);
          }
        } catch (error) {
          console.error("Error fetching exchange rate:", error);
          setOutput(null);
        }
      }
    };

    getCurrencyData();
  }, [from, to, amount]);

  return (
    <div>
      <input
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setAmount(Number(e.target.value))
        }
        placeholder="Enter amount"
      />
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
          setFrom(e.target.value)
        }
      >
        <option value="">Select currency</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>): void =>
          setTo(e.target.value)
        }
      >
        <option value="">Select currency</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output !== null ? output : ""}</p>
    </div>
  );
};

export default App;
