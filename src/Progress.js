export const Progress = ({ index, numQuestion, points, maxPoints }) => {
  return (
    <header className="progress">
      <progress max={numQuestion} value={index + 1} />
      <p>
        Questions <strong>{index + 1}</strong> / {numQuestion}
      </p>
      <p>
        <strong>{points}</strong> of {maxPoints} points
      </p>
    </header>
  );
};
