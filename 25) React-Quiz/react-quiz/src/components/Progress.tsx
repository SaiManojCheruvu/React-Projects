export default function Progress({
  index,
  numQuestions,
  points,
  maxPoints,
  answer,
}: {
  index: number;
  numQuestions: number;
  points: number;
  maxPoints: number;
  answer: number | null;
}) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints}
      </p>
    </header>
  );
}
