import { ActionType } from "./App";

export default function NextButton({
  dispatch,
  answer,
  index,
  numQuestions,
}: {
  dispatch: (action: ActionType) => void;
  answer: number | null;
  index: number;
  numQuestions: number;
}): JSX.Element | null {
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );

  return <></>;
}
