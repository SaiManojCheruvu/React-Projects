import { useState } from "react";

function App():JSX.Element {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}
function Counter():JSX.Element {
  const[count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(0);
  const date = new Date("june 21 2027")
  return (
    <>
      <div>
        <button onClick={() => setStep((c) => c - 1)}>-</button>
        <span>step: {step}</span>
        <button onClick={() => setStep((c) => c + 1)}>+</button>
      </div>
      <div>
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <span>Count: {count}</span>
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>
      <p>
        <span>{count === 0 ? "Today is ": count > 0 ? `${count} days from today is  `: `${Math.abs(count)} days ago was: `}</span>
        <span>{date.toDateString()}</span>
      </p>
    </>
  )
}

export default App;
