import type { CoursePart } from "../../data/courseParts";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (part: CoursePart) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b><br />
          <em>{part.description}</em>
        </p>
      )
    case "group":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b><br />
          Group projects: {part.groupProjectCount}
        </p>
      )
    case "background":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b><br />
          <em>{part.description}</em><br />
          Read more at <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
        </p>
      )
    case "special":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b><br />
          <em>{part.description}</em><br />
          Required skills: {part.requirements.join(", ")}
        </p>
      )
    default:
      return assertNever(part);
  }
};

export default Part;
