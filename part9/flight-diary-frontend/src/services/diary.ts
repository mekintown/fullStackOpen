import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Diary } from "../types";

import { NewDiary } from "../types";

const getAll = async () => {
  const { data } = await axios.get<Diary[]>(`${apiBaseUrl}/diaries`);

  return data;
};

const create = async (newDiary: NewDiary) => {
  const { data } = await axios.post<Diary>(`${apiBaseUrl}/diaries`, newDiary);
  return data;
};

export default {
  getAll,
  create,
};
