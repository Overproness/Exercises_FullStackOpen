const Course = (props) => {
    
    return(
        <>
            <h1>Web Development Cirriculum</h1>
            {props.courses.map(course =>  
                    <div key={course.id}>
                        <h2>{course.name}</h2>
                        {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
                        <p><strong>The Total Number of Exercises is {course.parts.map(part => part.exercises).reduce((s,p) => s + p,0)}</strong></p>
                    </div>
                )
            }
        </>
    )
}

export default Course