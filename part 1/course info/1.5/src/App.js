const Header = (props) => {
  return(
    <>
    <h1>{props.course}</h1>
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
    <Part partName={props.parts[0].name} exerciseNo={props.parts[0].exercises}/>
    <Part partName={props.parts[1].name} exerciseNo={props.parts[1].exercises}/>
    <Part partName={props.parts[2].name} exerciseNo={props.parts[2].exercises}/>
    </>
  )
}


const Total = (props) => {
  return(
    <>
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return(
    <>
    <Header course={course.name} />
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
    </>
  )
}






export default App