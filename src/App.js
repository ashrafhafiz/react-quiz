import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],
  status: "loading", // loading, error, ready, active, finished
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "loading":
      return { ...state, status: "loading" };
    case "start":
      return { ...state, status: "active" };
    default:
      return state;
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  const numQuestion = questions.length;

  useEffect(() => {
    async function fetchData() {
      // dispatch({ type: "loading" });
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
        console.log(data);
      } catch (error) {
        dispatch({ type: "dataFailed" });
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />

      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && <Question />}
      </Main>
    </div>
  );
}

export default App;
