const Header = (props) => {
  return(
    <>
    <h1>{props.courseName}</h1>
    </>
  )
}


const Part = (props) => {
  return(
    <>
    <p>
      {props.partName} {props.exerciseNo}
    </p>
    </>
  )
}


const Content = (props) => {
  return(
    <>
    <Part partName={props.part1} exerciseNo={props.exercise1}/>
    <Part partName={props.part2} exerciseNo={props.exercise2}/>
    <Part partName={props.part3} exerciseNo={props.exercise3}/>
    </>
  )
}


const Total = (props) => {
  return(
    <>
    <p>Number of exercises {props.exercise1 + props.exercise2 + props.exercise3}</p>
    </>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const part2 = 'Using props to pass data'
  const part3 = 'State of a component'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  return(
    <>
    <Header courseName={course} />
    <Content
      part1={part1}
      part2={part2}
      part3={part3}
      exercise1={exercises1}
      exercise2={exercises2}
      exercise3={exercises3}
    />
    <Total 
      exercise1={exercises1}
      exercise2={exercises2}
      exercise3={exercises3}
    />
    </>
  )
}






export default App