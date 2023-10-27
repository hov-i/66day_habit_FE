// useHabitData.ts
import { useMemo } from "react";
import backgroundColor from "../style/backgroundColor";

type HabitInfo = {
  habitName: string;
  backgroundColor: string;
  fontColor: string;
  habitTags: string[];
  id: number;
  habitVisibility: string;
};

function useHabitColor(habitData?: HabitInfo) {
  const selectedColor = useMemo(() => {
    if (habitData) {
      return backgroundColor.find(
        (item) => item.name === habitData.backgroundColor
      );
    }
    return null;
  }, [habitData]);

  const bgColorCode = selectedColor ? selectedColor.color : null;

  return { bgColorCode };
}

export default useHabitColor;
