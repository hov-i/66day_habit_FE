import { atom } from "recoil";
import { AlarmData, CommendHabitInfo, FriendInfo, HabitInfo } from "./types";
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

export const newHabitInfoState = atom<HabitInfo[]>({
  key: "newHabitInfoDataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const doneHabitInfoState = atom<HabitInfo[]>({
  key: "doneHabitInfoDataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const searchHabitInfoState = atom<HabitInfo[]>({
  key: "searchHabitInfoDataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const commendHabitInfoState = atom<CommendHabitInfo[]>({
  key: "commendHabitInfoDataState",
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

export const userIdState = atom<number>({
  key: "userId",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const roomIdState = atom<number>({
  key: "roomId",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const habitMessage = atom<string>({
  key: "habitMessageDate",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const habitNameState = atom<string>({
  key: "habitNameDateState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const chatNameState = atom<string>({
  key: "chatNameDateState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
export const chaMessageState = atom<string>({
  key: "chatMessageDateState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const alarmMessageState = atom<AlarmData[]>({
  key: "alarmMessageDataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
