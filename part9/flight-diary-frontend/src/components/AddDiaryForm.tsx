import { useState } from "react";
import diaryService from "../services/diary";
import { Diary } from "../types";

interface AddDiaryFormProps {
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const AddDiaryForm = ({ setDiaries }: AddDiaryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary = await diaryService.create({
      date,
      weather,
      visibility,
      comment,
    });
    setDiaries((prevDiaries) => [...prevDiaries, newDiary]);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="date">date: </label>
        <input
          id="date"
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <label htmlFor="weather">weather: </label>
        <input
          id="weather"
          type="text"
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
        ></input>
        <label htmlFor="visibility">visibility: </label>
        <input
          id="visibility"
          type="text"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        ></input>
        <label htmlFor="comment">comment: </label>
        <input
          id="comment"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <button type="submit">Create Diary</button>
      </form>
    </div>
  );
};

export default AddDiaryForm;
