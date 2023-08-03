import diagnoseData from "../data/diagnoses";
import { diagnoseEntry } from "../types";

const getEntry = (): diagnoseEntry[] => {
  return diagnoseData;
};

export default {
  getEntry,
};
