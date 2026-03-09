import { useEffect, useState } from "react";
import type { DiaryEntry } from "./types";
import Entry from "./components/Entry";
import diaryService from "./services/diaries";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  useEffect(() => {
    diaryService.getAll().then(data => {
      setDiaryEntries(data);
    })
  }, []);
  return (
    <>
      <h1>Flight Diary</h1>
      {diaryEntries.map(entry => <Entry key={entry.id} {...entry} />)}
    </>
  )
}

export default App
