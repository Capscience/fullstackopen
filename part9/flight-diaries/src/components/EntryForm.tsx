import { useState } from "react";
import type { NewDiaryEntry, Visibility, Weather } from "../types";

export interface EntryFormProps {
  addEntry: (arg0: NewDiaryEntry) => Promise<void>;
}

const EntryForm = (props: EntryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newEntry: NewDiaryEntry = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment,
    };
    await props.addEntry(newEntry);
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Date
            <input name="date" type="text" value={date} onChange={({ target }) => setDate(target.value)} />
          </label>
        </div>
        <div>
          <label>
            Visibility
            <input name="visibility" type="text" value={visibility} onChange={({ target }) => setVisibility(target.value)} />
          </label>
        </div>
        <div>
          <label>
            Weather
            <input name="weather" type="text" value={weather} onChange={({ target }) => setWeather(target.value)} />
          </label>
        </div>
        <div>
          <label>
            Comment
            <input name="comment" type="text" value={comment} onChange={({ target }) => setComment(target.value)} />
          </label>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default EntryForm;
