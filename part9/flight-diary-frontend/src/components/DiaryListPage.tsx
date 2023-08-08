import { Diary } from "../types";

interface DiaryProps {
  diaries: Diary[];
}

const DiaryListPage = ({ diaries }: DiaryProps) => {
  return (
    <div>
      {Object.values(diaries).map((diary) => (
        <div key={diary.id}>
          <p>{diary.id}</p>
          <h3>{diary.date}</h3>
          <p>{diary.weather}</p>
          <p>{diary.visibility}</p>
        </div>
      ))}
    </div>
  );
};

export default DiaryListPage;
