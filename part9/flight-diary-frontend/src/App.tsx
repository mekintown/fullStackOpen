import { useEffect, useState } from "react";
import { apiBaseUrl } from "./constants";
import axios from "axios";
import diaryService from "./services/diary";
import DiaryListPage from "./components/DiaryListPage";
import { Diary } from "./types";
import AddDiaryForm from "./components/AddDiaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/ping`);

    const fetchDiariesList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    fetchDiariesList();
  }, []);

  return (
    <div>
      <AddDiaryForm setDiaries={setDiaries} />
      <DiaryListPage diaries={diaries} />
    </div>
  );
};

export default App;
