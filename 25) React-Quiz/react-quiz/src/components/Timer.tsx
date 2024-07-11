import { useEffect } from "react";
import { ActionType } from "./App";

export default function Timer({
  secondsRemaining,
  dispatch,
}: {
  secondsRemaining: number | null;
  dispatch: (action: ActionType) => void;
}): JSX.Element {
  const mins = Math.floor(secondsRemaining ? secondsRemaining / 60 : 0);
  const seconds = secondsRemaining ? secondsRemaining % 60 : 0;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
