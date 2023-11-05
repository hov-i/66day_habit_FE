import { atom } from "recoil";
import { FriendInfo, HabitInfo } from "./types";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const userHabitInfoState = atom<HabitInfo[]>({
  key: "userHabitInfoDataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const memberHabitInfoState = atom<HabitInfo[]>({
  key: "memberHabitInfoDataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const habitIdState = atom<number>({
  key: "habitIdDataState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const friendInfoState = atom<FriendInfo[]>({
  key: "friendInfoDataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const memberIdState = atom<number>({
  key: "selectId",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
