import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header value="give feedback"/>
      <Button name="good" onclick={()=>setGood(good+1)} />
      <Button name="neutral" onclick={()=>setNeutral(neutral+1)} />
      <Button name="bad" onclick={()=>setBad(bad+1)} />
      <Header value="statistics"/>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}
const Header = (props) => {
  return (
    <h1>
      {props.value}
    </h1>
  )
}

const Statistics = (props) => {
  let bad = props.bad
  let good = props.good
  let neutral = props.neutral
  if(bad+neutral+good>0){
    return(
      <table>
        <StatisticLine  text="good" value={good} />
        <StatisticLine  text="neutral" value={neutral} />
        <StatisticLine  text="bad" value={bad} />
        <StatisticLine  text="all" value={bad+neutral+good} />
        <StatisticLine  text="average" value={good-bad/(bad+neutral+good)} />
        <StatisticLine  text="positive" value={good/(bad+neutral+good)} />
      </table>
    )
  }
  return(
    <div>
      No feedback given
    </div>
  )
}

const StatisticLine  = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onclick}>
      {props.name}
    </button>
  )
}
export default App