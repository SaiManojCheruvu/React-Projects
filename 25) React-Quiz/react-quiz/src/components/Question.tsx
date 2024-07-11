import { ActionType, DataType } from "./App";
import Options from "./Options";
export default function Question({
  question,
  dispatch,
  answer,
}: {
  question: DataType;
  dispatch: (action: ActionType) => void;
  answer: number | null;
}) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
