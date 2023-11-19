import styles from "./index.css";
import ReactDOM from "react-dom";
import Die from "./components/die";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [number, setNumber] = useState(randomNumber());
  const [win, setWin] = useState(false);
  function randomNumber() {
    var numbers = new Array(10).fill(1);
    return numbers.map((n) => {
      return {
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      };
    });
  }

  useEffect(() => {
    !number.find((element) => !element.isHeld) &&
    !number.find((element) => element.value != number[0].value)
      ? setWin(true)
      : setWin(false);
  }, [number]);

  function handleClick() {
    setNumber((prevState) => {
      return prevState.map((state) => {
        return !state.isHeld
          ? { id: nanoid(), value: Math.ceil(Math.random() * 6), isHeld: false }
          : state;
      });
    });
  }

  function changeHeld(id) {
    setNumber((prevState) => {
      const result = prevState.find((element) => element.id === id);
      result.isHeld = !result.isHeld;
      return [...prevState];
    });
  }

  function reset() {
    setNumber(randomNumber());
  }

  return (
    <main>
      <div className="tenzie-cont">
        {win && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instruction">
          Roll until all dice are the same. <br /> Click each die to freeze it
          at its currente value between rolls.
        </p>
        <div className="tenzie-container">
          {number.map((element) => (
            <Die
              key={element.id}
              element={element}
              isHeld={element.isHeld}
              changeHeld={changeHeld}
            />
          ))}
        </div>
        {win ? (
          <button className="roll-button2" onClick={reset}>
            New Game
          </button>
        ) : (
          <button className="roll-button" onClick={handleClick}>
            Roll
          </button>
        )}
      </div>
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
