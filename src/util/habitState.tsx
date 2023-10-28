import { atom } from "recoil";
import { HabitInfo } from "./types";

export const habitInfoState = atom<HabitInfo[]>({
  key: "habitInfoDataState",
  default: [],
});

export const habitIdState = atom<number>({
  key: "habitIdDataState",
  default: 0,
});
