import { ActionType, DataType } from "./App";

export default function Options({
  question,
  dispatch,
  answer,
}: {
  question: DataType;
  dispatch: (action: ActionType) => void;
  answer: number | null;
}) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() =>
            dispatch({ type: "newAnswer", payload: Number(index) })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}
