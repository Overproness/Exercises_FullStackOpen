import { useState } from 'react'

const Display = (props) => <>{props.value}</>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const App = () => {
  const [clicks, setclicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })



  const handleClicksGood = () => {
    const newGoodClick = {
      ...clicks, 
      good: clicks.good + 1
    }
    setclicks(newGoodClick)
  }


  const handleClicksNeutral = () => {
    const newNeutralClick = {
      ...clicks, 
      neutral: clicks.neutral + 1
    }
    setclicks(newNeutralClick)
  }


  const handleClicksBad = () => {
    const newBadClick = {
      ...clicks, 
      bad: clicks.bad + 1
    }
    setclicks(newBadClick)
  }



  return (
    <>
    <h1>Give Feedback</h1>
    <Button handleClick={() => handleClicksGood()} text='Good'/>
    <Button handleClick={() => handleClicksNeutral()} text='Neutral'/>
    <Button handleClick={() => handleClicksBad()} text='Bad'/>
    <h1>Statistics</h1>
    <p>Good: <Display value={clicks.good} /></p>
    <p>Neutral: <Display value={clicks.neutral} /></p>
    <p>Bad: <Display value={clicks.bad} /></p>
    </>
  )
}

export default App