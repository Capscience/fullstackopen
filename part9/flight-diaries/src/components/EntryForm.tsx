import { useState } from "react";
import axios from "axios";
import diaryService from "../services/diaries";
import type { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "../types";

export interface EntryFormProps {
  addEntry: (arg0: DiaryEntry) => Promise<void>;
}

const EntryForm = (props: EntryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("")

  const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!date || !visibility || !weather) {
      setError("Some values are missing!");
      return;
    }
    const newEntry: NewDiaryEntry = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment,
    };

    try {
      const addedEntry = await diaryService.create(newEntry);
      await props.addEntry(addedEntry);

      setDate("");
      setComment("");
    } catch (e) {
      if (axios.isAxiosError<string, Record<string, unknown>>(e)) {
        if (e.response) {
          setError(e.response.data);
        }
      } else {
        console.error(e);
      }
    };
  };

  const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

  return (
    <>
      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Date
            <input name="date" type="date" value={date} onChange={({ target }) => setDate(target.value)} />
          </label>
        </div>
        <div>
          <fieldset>
            <legend>Visibility</legend>
            {["great", "good", "ok", "poor"].map(value =>
            (
              <div key={value}>
                <label>
                  {capitalize(value)}
                  <input name="visibility" type="radio" onChange={() => setVisibility(value)} />
                </label>
              </div>
            )
            )}
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend>Weather</legend>
            {["sunny", "rainy", "cloudy", "stormy", "windy"].map(value =>
            (
              <div key={value}>
                <label>
                  {capitalize(value)}
                  <input name="weather" type="radio" onChange={() => setWeather(value)} />
                </label>
              </div>
            )
            )}
          </fieldset>
        </div>
        <div>
          <label>
            Comment
            <input name="comment" type="text" value={comment} onChange={({ target }) => setComment(target.value)} />
          </label>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  )
}

export default EntryForm;
