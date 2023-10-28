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
  name: string;
  placeholder: string;
  setInputValue: (value: string) => void;
}

export interface BackGroundColorBoxProps {
  id: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface BackGroundColorEditProps {
  setSeletValue: (value: string) => void;
}

export interface DisclosureSelectProps {
  setSeletValue: (value: string) => void;
}

export interface FontColorEditProps {
  setSeletValue: (value: string) => void;
}

export interface TagEditBoxProps {
  name: string;
  placeholder: string;
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

export interface InfoData {
  username: string;
  introduction: string;
}

export type HabitInfo = {
  habitName: string;
  backgroundColor: string;
  fontColor: string;
  habitTags: string[];
  id: number;
  habitVisibility: string;
};

export interface HabitBoxProps {
  name: "main" | "commend" | "friend" | "search";
  habitId?: number;
}
