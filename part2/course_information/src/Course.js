const Course = (props) => {
    return (
      <div>
        {props.courses.map((course)=>
            <div key={course.id}>      
                <h1>
                    {course.name}
                </h1>
            
                {course.parts.map((part)=>
                    <div key={part.id}>
                        {part.name} {part.exercises}
                    </div>
                )}
            
                <div>
                    total of {course.parts.reduce((sum,part)=>sum+part.exercises, 0)} exercises
                </div>
            </div>
        )}
      </div>
    )
  }

export default Course