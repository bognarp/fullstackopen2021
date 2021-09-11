import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.courseName}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.partNum} {props.exerciseName}</p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part partNum={props.parts[0].name} exerciseName={props.parts[0].exercises} />
      <Part partNum={props.parts[1].name} exerciseName={props.parts[1].exercises} />
      <Part partNum={props.parts[2].name} exerciseName={props.parts[2].exercises} />
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
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

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
