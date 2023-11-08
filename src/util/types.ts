import { ReactNode } from "react";

export interface AlertProps {
  open: boolean;
  close: (name: string) => void;
  name: string;
  children?: ReactNode;
}

export interface BoxProps {
  children: ReactNode;
}

export interface ContainerProps {
  children: ReactNode;
}

export interface ContentProps {
  children: ReactNode;
  name: string;
}

export interface ModalProps {
  open: boolean;
  close: (name: string) => void;
  name: string;
  children?: ReactNode;
  height: string;
}

export interface NextButtonProps {
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ScrollBoxProps {
  children: ReactNode;
}

export interface TextEditBoxProps {
  name?: string;
  title: string;
  placeholder: string;
  setInputValue: (value: string) => void;
  value?: string;
}

export interface BackGroundColorBoxProps {
  id: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface BackGroundColorEditProps {
  setSeletValue: (value: string) => void;
  name?: string;
  value?: string;
}

export interface DisclosureSelectProps {
  setSeletValue: (value: string) => void;
  name?: string;
  value?: string;
}

export interface FontColorEditProps {
  setSeletValue: (value: string) => void;
  name?: string;
  value?: string;
}

export interface TagEditBoxProps {
  name?: string;
  title: string;
  value?: { id: number; tag: string }[];
  placeholder?: string;
  setTagValue: (value: string[]) => void;
}

export interface ErrorProps {
  onClose: () => void;
  errorCode?: string;
}

export interface TextBoxProps {
  name: "이메일" | "비밀번호";
  setInputValue: (value: string) => void;
}

export interface ButtonProps {
  name: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface BubbleBoxProps {
  children: ReactNode;
  name: "left" | "right";
  buttonRef?: React.MutableRefObject<HTMLDivElement | null>;
}

export type InfoData = {
  username: string;
  introduction: string;
  profileImage?: string | null;
  backgroundImage?: string | null;
  isFriend?: number;
};

export type HabitRecordInfo = {
  dayNumber: number;
  achievementRate: number;
};

export type HabitInfo = {
  habitName: string;
  backgroundColor: string;
  fontColor: string;
  habitTags: string[];

  habitId: number;
  habitVisibility: string;
  habitDetail: {
    progress: number;
    achievementRates: {
      thirty?: number;
      fifty?: number;
      hundred?: number;
    };
    todayChecked: boolean;
  };
  habitRecord: HabitRecordInfo[];
};

export interface FriendInfo {
  memberId: number;
  username: string;
  profileImage: string;
}

export interface HabitBoxProps {
  name: "main" | "commend" | "friend" | "search";
  habitId?: number;
  title?: string;
  habitName?: string;
}

export interface HabitMoreProps {
  habitId?: number;
}

export interface ProfileProps {
  name?: "main" | "edit" | "mypage" | "search" | "friend";
  userName?: string;
  Introduction?: string;
  profileImage?: string;
}

export interface HabitAddProps {
  name: "add" | "edit";
  habitId?: number;
}

export interface HabitCalendarBoxProps {
  day: number;
}

export interface StickerData {
  stickerImage: JSX.Element | null;
  stickerText: number | null;
}

export interface SearchInfo {
  backgroundImage: string;
  friendHabitList: [];
  friendId: number;
  introduction: string;
  isFriend: number;
  profileImage: string;
  username: string;
}

export interface QuoteData {
  wiseSaying: string;
  greatPerson: string;
}

export interface HabitData {
  habitSubject: string;
  habitName: string;
}

export interface CommendHabitInfo {
  habitSubject: string;
  habitName: string;
}
