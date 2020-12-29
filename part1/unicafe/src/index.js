import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>average {(good + neutral + bad) / 3} </p>
      <p>positive {(good * 100) / (good + neutral + bad)} %</p>
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood((prevState) => prevState + 1)}>good</button>
      <button onClick={() => setNeutral((prevState) => prevState + 1)}>neutral</button>
      <button onClick={() => setBad((prevState) => prevState + 1)}>bad</button>
      <h1>statistics</h1>
      {(good || neutral || bad) ? <Statistics good={good} neutral={neutral} bad={bad} /> : "No feedback given"}

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root'))