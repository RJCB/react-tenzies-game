import './App.css';
import { useEffect, useState } from 'react';
import Die from "./components/Die";

function App() {
  const [dice, setDice] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false);
  const [count, setCount] = useState(0);

  function allNewDice() {
    // let randomDice = Array.from(Array(10)).map(x => Math.ceil(Math.random() * 6));
    let randomDice = [];
    for (let i = 0; i < 10; i++) {
      randomDice.push({ value: Math.ceil(Math.random() * 6), isHeld: false, id: i });
    }
    return randomDice;
  }

  useEffect(() => {
    const firstValue = dice[0].value;
    const allHeld = dice.every(die => die.isHeld);
    const allSameValue = dice.every(die => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
    } else {
      return;
    }
  }, [dice])

  function holdDice(id) {
    setDice(oldDice => oldDice.map((die) => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
    }));
  }

  const diceElements = dice.map((die) => {
    return <Die isHeld={die.isHeld} holdDice={holdDice} value={die.value} key={die.id} id={die.id} />
  })

  function rollDice() {
    setCount(prevValue => {
      return prevValue + 1;
    })
    setDice(oldDice => oldDice.map((die) => {
      return die.isHeld === true ? die : {
        ...die, value: Math.ceil(Math.random() * 6)
      };
    }))
  }

  function newGame() {
    localStorage.setItem("count", count);
    setDice(allNewDice);
    setTenzies(false);
    setCount(0);
  }

  return (
    <div className="App">
      <main>
        <h1 className="title">Tenzies</h1>
        {tenzies ? <p className="game-desc">You Won!</p> : <p className="game-desc">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>}
        <p>Roll count: {count}</p>
        <div className="die-container">
          {diceElements}
        </div>
        <button onClick={tenzies ? newGame : rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </main>
    </div>
  );
}

export default App;
