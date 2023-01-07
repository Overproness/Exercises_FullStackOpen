const Header = (props) => {
  return(
    <>
    <h1>{props.courseName}</h1>
    </>
  )
}


const Content = (props) => {
  return(
    <>
    <p>
      {props.part1Name} {props.exercises1No}
    </p>
    <p>
      {props.part2Name} {props.exercises2No}
    </p>
    <p>
      {props.part3Name} {props.exercises3No}
    </p>
    </>
  )
}


const Total = (props) => {
  return(
    <>
    <p>Number of exercises {props.exercises1No + props.exercises2No + props.exercises3No}</p>
    </>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return(
    <>
    <Header courseName={course} />
    <Content 
      part1Name={part1} 
      part2Name={part2}
      part3Name={part3}
      exercises1No={exercises1}
      exercises2No={exercises2}
      exercises3No={exercises3}
    />
    <Total 
      exercises1No={exercises1}
      exercises2No={exercises2}
      exercises3No={exercises3}
    />
    </>
  )
}






export default App