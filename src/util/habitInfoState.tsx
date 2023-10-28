import { atom } from "recoil";
import { HabitInfo } from "./types";

export const habitInfoState = atom<HabitInfo[]>({
  key: "habitInfoDataState",
  default: [],
});
