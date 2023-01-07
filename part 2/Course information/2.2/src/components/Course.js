const Course = (props) => {
    return(
        <>
        <h1>{props.course.name}</h1>
        {props.course.parts.map(
            part => <p key={part.id}>{part.name} {part.exercises}</p>
        )}
        <p><strong>The Total Number of Exercises is {props.totalExercises}</strong></p>
        </>
    )
}

export default Course