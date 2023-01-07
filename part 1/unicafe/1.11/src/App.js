import { useState } from 'react'

const Display = (props) => <>{props.value}</>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const StatisticLine = ({text, value, goodClicks, neutralClicks, badClicks}) =>{
  return(
    <>
      <td><p>{text}</p></td>
      <td><p><Display value={value} /></p></td>
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



  const totalClicks = clicks.good + clicks.neutral + clicks.bad
  let _clickPercentage = 0
  if (totalClicks !==0)
    _clickPercentage = clicks.good/totalClicks * 100     //If is used to avoid dividing by 0. 
  const clickValues = {
    good: 1,
    neutral: 0,
    bad: -1,
    total: clicks.good - clicks.bad  // Since Neutral has a weightage of 0 so it is omitted. 
  }
  

  
  if (totalClicks ===0){
    return(
      <>
        <h1>Give Feedback</h1>
        <Button handleClick={() => handleClicksGood()} text='Good'/>
        <Button handleClick={() => handleClicksNeutral()} text='Neutral'/>
        <Button handleClick={() => handleClicksBad()} text='Bad'/>
        <h1>Statistics</h1>
        <p>No Feedback Given</p>
      </>
    )
  }
  else {
    return (
      <>
      <h1>Give Feedback</h1>
      <Button handleClick={() => handleClicksGood()} text='Good'/>
      <Button handleClick={() => handleClicksNeutral()} text='Neutral'/>
      <Button handleClick={() => handleClicksBad()} text='Bad'/>
      <h1>Statistics</h1>
      <table>
        <tr><StatisticLine text='Good: ' value={clicks.good} goodClicks={clicks.good} badClicks={clicks.bad} neutralClicks={clicks.neutral} /></tr>
        <tr><StatisticLine text='Neutral: ' value={clicks.neutral} goodClicks={clicks.good} badClicks={clicks.bad} neutralClicks={clicks.neutral} /></tr>
        <tr><StatisticLine text='Bad: ' value={clicks.bad} goodClicks={clicks.good} badClicks={clicks.bad} neutralClicks={clicks.neutral} /></tr>
        <tr><StatisticLine text='Total: ' value={totalClicks} goodClicks={clicks.good} badClicks={clicks.bad} neutralClicks={clicks.neutral} /></tr>
        <tr><StatisticLine text='Average: ' value={clickValues.total} goodClicks={clicks.good} badClicks={clicks.bad} neutralClicks={clicks.neutral} /></tr>
        <tr><StatisticLine text='Percentage: ' value={_clickPercentage} goodClicks={clicks.good} badClicks={clicks.bad} neutralClicks={clicks.neutral} /></tr>
      </table>
      </>
    )
  }
}

export default App

