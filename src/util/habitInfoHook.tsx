import { useMemo } from "react";
import { HabitInfo } from "./types";

function useHabitData(habitInfoData: HabitInfo[], habitId?: number) {
  const habitData = useMemo(() => {
    return habitInfoData.find((data) => data.habitId === habitId);
  }, [habitInfoData, habitId]);

  return { habitData };
}

export default useHabitData;
