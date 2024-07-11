import { ActionType } from "./App";
import { Dispatch } from "react";
export default function StartScreen({
  numQuestions,
  dispatch,
}: {
  numQuestions: number;
  dispatch: Dispatch<ActionType>;
}) {
  return (
    <div className="start">
      <h2>Welcome to React QUIZ</h2>
      <h3>{numQuestions} Question to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}
