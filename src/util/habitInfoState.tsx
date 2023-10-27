import { atom } from "recoil";

type HabitInfo = {
  habitName: string;
  backgroundColor: string;
  fontColor: string;
  habitTags: string[];
  id: number;
  habitVisibility: string;
};

export const habitInfoState = atom<HabitInfo[]>({
  key: "habitInfoDataState",
  default: [],
});
