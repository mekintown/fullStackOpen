import axios from "axios";
import { DiagnoseEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<DiagnoseEntry[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};

export default { getAll };
