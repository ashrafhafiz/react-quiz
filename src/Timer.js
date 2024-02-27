import { useEffect } from "react";

const Timer = ({ dispatch, secondsRemaining }) => {
  const minutes = (secondsRemaining - (secondsRemaining % 60)) / 60;
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const intervalID = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(intervalID);
  }, [dispatch]);

  return (
    <div className="timer">
      {minutes < 10 && "0"}
      {minutes}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
};

export default Timer;
