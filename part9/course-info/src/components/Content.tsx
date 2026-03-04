import CoursePart, { type CoursePartProps } from "./CoursePart";

interface ContentProps {
  courseParts: CoursePartProps[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map(part => <CoursePart {...part} />)}
    </>
  )
}

export default Content;
