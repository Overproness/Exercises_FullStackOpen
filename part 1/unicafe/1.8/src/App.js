import { useState } from 'react'

const Display = (props) => <>{props.value}</>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const Statistics = ({goodClicks, neutralClicks, badClicks}) =>{
  const totalClicks = goodClicks + neutralClicks + badClicks
  let _clickPercentage = 0
  if (totalClicks !==0)
    _clickPercentage = goodClicks/totalClicks * 100
  const clickValues = {
    good: 1,
    neutral: 0,
    bad: -1,
    total: goodClicks - badClicks  // Since Neutral has a weightage of 0 so it is omitted. 
  }
  const averageValues = clickValues.total

  return(
    <>
      <p>Total: {totalClicks}</p>
      <p>Average: {averageValues}</p>
      <p>Percentage: {_clickPercentage}</p>
    </>
  )
}


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
    <Statistics goodClicks={clicks.good} badClicks={clicks.bad} neutralClicks={clicks.neutral} />
    </>
  )
}

export default App