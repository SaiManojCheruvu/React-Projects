import React, { useReducer, ChangeEvent, MouseEvent } from "react";
{
  /**
    - An alternative way of setting state, ideal for complex state and related pieces of state.
    - Stores related pieces of state in state object.
    - useReducer needs reducer: function containing all logic to update state. Decouples state logic from component.
    - reducer: pure function(no side effects!) that takes current state and action, and returns the next state.
    - action: object that describes how to update state.
    - dispatch: function to trigger state updates, by sending actions from event handlers to the reducer(instead of setState). 

    Analogy for useReducer:
    Imagine a situation where we need to get to a bank and request the banker to withdraw the money from the bank vault.
    So here the money in the bank vault is state.
    The banker is the reducer(), who gets the money
    The dispatcher is the person requesting the amount. - I would like to with draw 5000$ from account xxxxx
    Action: How to make the update
    type: ""withdraw",
    payload:{
    amount: 5000,
    account: xxxxx, }
   */
}
type State = {
  count: number;
  step: number;
};

type Action =
  | { type: "dec" }
  | { type: "inc" }
  | { type: "setCount"; payload: number }
  | { type: "setStep"; payload: number }
  | { type: "reset" };

const initialState: State = { count: 0, step: 1 };

function reducer(state: State, action: Action): State {
  console.log(state, action);

  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}

const DateCounter: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  const date: Date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec: (event: MouseEvent<HTMLButtonElement>) => void = () => {
    dispatch({ type: "dec" });
  };

  const inc: (event: MouseEvent<HTMLButtonElement>) => void = () => {
    dispatch({ type: "inc" });
  };

  const defineCount: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset: (event: MouseEvent<HTMLButtonElement>) => void = () => {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default DateCounter;
