import { useEffect, useState } from "react";
import type { DiaryEntry } from "./types";
import Entry from "./components/Entry";
import diaryService from "./services/diaries";
import EntryForm from "./components/EntryForm";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  useEffect(() => {
    diaryService.getAll().then(data => {
      setDiaryEntries(data);
    })
  }, []);

  const addEntry = async (newEntry: DiaryEntry) => {
    setDiaryEntries(diaryEntries.concat(newEntry));
  }

  return (
    <>
      <h1>Flight Diary</h1>
      <EntryForm addEntry={addEntry} />
      {diaryEntries.map(entry => <Entry key={entry.id} {...entry} />)}
    </>
  )
}

export default App
