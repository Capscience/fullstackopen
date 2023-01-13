const Header = ({course}) => {
    console.log(course)
    return (
        <>
            <p>{course.name}</p>
        </>
    )
}

const Total = ({course}) => {
    console.log(course)
    return (
        <>
            <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
        </>
    )
}

const Part = (props) => {
    console.log(props)
    return (
        <div>
            {props.part} {props.exercises}
        </div>
    )
}

const Content = ({course}) => {
    console.log(course)
    return (
        <>
            <Part part={course.parts[0].name} exercises={course.parts[0].exercises} />
            <Part part={course.parts[1].name} exercises={course.parts[1].exercises} />
            <Part part={course.parts[2].name} exercises={course.parts[2].exercises} />
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
    return (
            <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
            </div>
    )
}

export default App;
