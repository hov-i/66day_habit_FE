import { atom } from "recoil";
import { HabitInfo } from "./types";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const habitInfoState = atom<HabitInfo[]>({
  key: "habitInfoDataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const habitIdState = atom<number>({
  key: "habitIdDataState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
