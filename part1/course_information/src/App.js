import React from 'react'

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

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (prop) => {
  return (
    <>
      <h1>{prop.course}</h1>
    </>
  )
}

const Part = (prop) => {
  return (
    <>
      <p>
        {prop.part.name} {prop.part.exercises}
      </p>
    </>
  )
}

const Content = (prop) => {
  return (
   <>
      <Part part={prop.parts[0]} />
      <Part part={prop.parts[1]} />
      <Part part={prop.parts[2]} />
   </>
 )
}

const Total = (prop) => {

  return (
    <>
          <p>Number of exercises {prop.parts[0].exercises + prop.parts[1].exercises + prop.parts[2].exercises}</p>
    </>
  )
}


export default App