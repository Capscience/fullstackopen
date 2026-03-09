import type { DiaryEntry } from "../types";

const Entry = (entry: DiaryEntry) => {
  return (
    <>
      <p>
        <b>{entry.date}:</b><br />
        Visibility: {entry.visibility}<br />
        Weather: {entry.weather}<br />
      </p>
    </>
  )
}

export default Entry;
