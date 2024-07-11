import React, { useState } from "react";
import "./styles.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Counter />
    </div>
  );
};

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);

  function handleReset(): void {
    setCount(0);
    setStep(1);
  }

  const date = new Date("June 21, 2027");
  date.setDate(date.getDate() + count);

  return (
    <div>
      <div>
        <input 
          type="range" 
          min={0} 
          max={10} 
          value={step} 
          onChange={(e) => setStep(+e.target.value)} 
        />
        <button onClick={() => setStep((c) => c - 1)}>-</button>
        <input 
          type="text" 
          value={count} 
          onChange={(e) => setCount(+e.target.value)} 
        />
        <span>Step: {step}</span>
        <button onClick={() => setStep((c) => c + 1)}>+</button>
      </div>

      <div>
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <span>Count: {count}</span>
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>

      <p>
        <span>
          {count === 0
            ? "Today is "
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </p>
      
      {(count !== 0 || step !== 1) && (
        <div>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default App;
