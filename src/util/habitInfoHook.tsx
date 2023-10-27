import { useMemo } from "react";

type HabitInfo = {
  habitName: string;
  backgroundColor: string;
  fontColor: string;
  habitTags: string[];
  id: number;
  habitVisibility: string;
};

function useHabitData(habitInfoData: HabitInfo[], habitId?: number) {
  const habitData = useMemo(() => {
    return habitInfoData.find((data) => data.id === habitId);
  }, [habitInfoData, habitId]);

  return { habitData };
}

export default useHabitData;
