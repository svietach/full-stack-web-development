import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({});
  const maxPoints = Math.max(...Object.values(points));
  let anecdoteNumberOne = {};
  Object.keys(points).forEach((point) => {
    if (points[point] == maxPoints) {
      anecdoteNumberOne = point;
    }
  })


  return (
    <div>
      <h1> Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br />
      {points[selected] ? `has ${points[selected]} votes` : `has 0 votes`}
      <br />
      <button onClick={() => setPoints((prevState) => {
        if (!prevState[selected]) {
          prevState[selected] = 1;
        } else {
          prevState[selected] += 1;
        }

        return { ...prevState };
      })}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * Math.floor(5)))}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      {anecdotes[anecdoteNumberOne]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)