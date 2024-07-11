import { useReducer } from "react";
import "./styles.css";
type StateType = {
  balance: number;
  loan: number;
  isActive: boolean;
};
const initialState: StateType = {
  balance: 0,
  loan: 0,
  isActive: false,
};
type Action =
  | { type: "openAccount" }
  | { type: "Deposit"; payload: number }
  | { type: "withDraw"; payload: number }
  | { type: "loan"; payload: number }
  | { type: "payLoan" }
  | { type: "close" };
function reducer(state: StateType, action: Action): StateType {
  if (state.isActive && action.type === "openAccount") return state;
  switch (action.type) {
    case "openAccount":
      return { ...state, isActive: true, balance: 500 };
    case "Deposit":
      return { ...state, balance: state.balance + action.payload };
    case "withDraw":
      return { ...state, balance: state.balance - action.payload };
    case "loan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload,
      };
    case "payLoan":
      return { ...state, loan: 0, balance: state.balance - state.loan };
    case "close":
      if (state.balance !== 0 || state.loan > 0) return state;
      return initialState;

    default:
      return state;
  }
}
function App(): JSX.Element {
  const [{ balance, isActive, loan }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: "openAccount" });
          }}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "Deposit", payload: 150 });
          }}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "withDraw", payload: 50 });
          }}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "loan", payload: 5000 });
          }}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "payLoan" });
          }}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "close" });
          }}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}

export default App;
