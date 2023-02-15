const Course = ({course}) => {
    return (
        <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </>

    )
}

const Header = ({course}) => {
    console.log(course)
    return (
        <>
            <h2>{course.name}</h2>
        </>
    )
}

const Total = ({course}) => {
    console.log(course)
    const total = course.parts.reduce((sum, part) => {
        console.log(sum, part.exercises);
        return sum + part.exercises
    }, 0)
    return (
        <>
            <p><strong>Number of exercises {total}</strong></p>
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
            {course.parts.map((part) => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
        </>
    )
}

export default Course
