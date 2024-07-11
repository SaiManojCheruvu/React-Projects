import { ActionType } from "./App";

export default function FinishScreen({
  points,
  maxPoints,
  highScore,
  dispatch,
}: {
  points: number;
  maxPoints: number;
  highScore: number;
  dispatch: (action: ActionType) => void;
}): JSX.Element {
  let emoji: string;
  const percentage: number = (points / maxPoints) * 100;

  if (percentage === 100) {
    emoji = "🎖️";
  } else if (percentage >= 80) {
    emoji = "🎉";
  } else if (percentage >= 50) {
    emoji = "😊";
  } else if (percentage > 0) {
    emoji = "🧐";
  } else {
    emoji = "🤦‍♂️";
  }

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(percentage)}%);
      </p>
      <p className="highscore">Highscore: {highScore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart
      </button>
    </>
  );
}
