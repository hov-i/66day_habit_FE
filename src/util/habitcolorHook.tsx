import { useMemo } from "react";
import backgroundColor from "../style/backgroundColor";
import { HabitInfo } from "./types";

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
