import React from 'react';

const Header = (props) => {
    return <h2>
        {props.name}
    </h2>;
};

const Content = ({ parts }) => parts.map(part =>
    <Part
        key={part.id}
        name={part.name}
        exercises={part.exercises}
    />
)
const Part = (props) => <p>{
    props.name} {props.exercises}
</p>

const Total = ({ total }) => <p><b>total of {total} exercises</b></p>

const Course = ({ course }) => {
    const total = course.parts.map(part => part.exercises).reduce((s, p) => s + p)

    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total total={total} />
        </div>
    )
}

export default Course;