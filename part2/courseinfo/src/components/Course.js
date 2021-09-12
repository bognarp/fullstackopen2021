import React from 'react';

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {
    const sum = course.parts.reduce((acc, current) => acc + current.exercises, 0)

    return (
        <strong>total of {sum} exercises</strong>
    )
}

const Part = (props) => {
    const { name, exercises } = props.part

    return (
        <p>
            {name} {exercises}
        </p>
    )
}

const Content = (props) => {
    const { course } = props

    return (
        <div>
            {course.parts.map(part =>
                <Part key={part.id} part={part} />
            )}

        </div>
    )
}

const Course = (props) => {
    const { course } = props
    return (
        <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </>
    )
}

export default Course
