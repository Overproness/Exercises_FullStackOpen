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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return(
    <>
    <Header courseName={course} />
    <Content 
      part1={part1.name}
      part2={part2.name}
      part3={part3.name}
      exercise1={part1.exercises}
      exercise2={part2.exercises}
      exercise3={part3.exercises}
    />
    <Total 
      exercise1={part1.exercises}
      exercise2={part2.exercises}
      exercise3={part3.exercises}
    />
    </>
  )
}






export default App