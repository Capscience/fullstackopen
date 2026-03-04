export interface CoursePartProps {
  name: string;
  exerciseCount: number;
};

const CoursePart = (props: CoursePartProps) => {
  return (
    <p>
      {props.name} {props.exerciseCount}
    </p>
  )
};

export default CoursePart;
