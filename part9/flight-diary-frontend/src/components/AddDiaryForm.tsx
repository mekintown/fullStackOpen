import { useState } from "react";
import diaryService from "../services/diary";
import { Diary } from "../types";
import axios from "axios";

interface AddDiaryFormProps {
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const AddDiaryForm = ({ setDiaries }: AddDiaryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const newDiary = await diaryService.create({
        date,
        weather,
        visibility,
        comment,
      });
      setDiaries((prevDiaries) => [...prevDiaries, newDiary]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
        setTimeout(() => {
          setError("");
        }, 5000);
      } else {
        console.log(error);
      }
    }
  };

  const ErrorStyle = {
    color: "red",
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <p style={ErrorStyle}>{error}</p>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="date">date: </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <legend>Select a weather:</legend>
        <div>
          <input
            id="sunny"
            type="radio"
            name="weather"
            onChange={() => setWeather("sunny")}
          />
          <label htmlFor="sunny">Sunny</label>
          <input
            id="rainy"
            type="radio"
            name="weather"
            onChange={() => setWeather("rainy")}
          />
          <label htmlFor="rainy">Rainy</label>
          <input
            id="cloudy"
            type="radio"
            name="weather"
            onChange={() => setWeather("cloudy")}
          />
          <label htmlFor="cloudy">Cloudy</label>
          <input
            id="stormy"
            type="radio"
            name="weather"
            onChange={() => setWeather("stormy")}
          />
          <label htmlFor="stormy">Stormy</label>
          <input
            id="windy"
            type="radio"
            name="weather"
            onChange={() => setWeather("windy")}
          />
          <label htmlFor="windy">Windy</label>
        </div>
        <legend>Select visibility:</legend>
        <div>
          <input
            id="great"
            type="radio"
            name="visibility"
            onChange={() => setVisibility("great")}
          />
          <label htmlFor="great">Great</label>
          <input
            id="good"
            type="radio"
            name="visibility"
            onChange={() => setVisibility("good")}
          />
          <label htmlFor="good">Good</label>
          <input
            id="ok"
            type="radio"
            name="visibility"
            onChange={() => setVisibility("ok")}
          />
          <label htmlFor="ok">Ok</label>
          <input
            id="poor"
            type="radio"
            name="visibility"
            onChange={() => setVisibility("poor")}
          />
          <label htmlFor="poor">Poor</label>
        </div>
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
