import { useState, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import AxiosAPI from "../api/AxiosAPI";
import { useSetRecoilState } from "recoil";
import { doneHabitInfoState, newHabitInfoState } from "./habitState";

interface AxiosResult {
  loading: boolean;
  error: any;
  hasMore: boolean;
}

function useIntersect(page: number, name: string, query?: string): AxiosResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const setNewHabitInfoData = useSetRecoilState(newHabitInfoState);
  const setDoneHabitInfoData = useSetRecoilState(doneHabitInfoState);

  const sendQuery = useCallback(async () => {
    setLoading(true);
    setError(false);

    if (name === "new") {
      const getNewHabit = async () => {
        try {
          const response = await AxiosAPI.newHabit(page);
          if (response.status === 200) {
            if (page === 0) {
              setNewHabitInfoData(response.data.data.habitList);
            } else {
              setNewHabitInfoData((prevList) =>
                prevList.concat(response.data.data.habitList)
              );
            }
            setLoading(false);
            setHasMore(response.data.data.habitList.length > 0);
            console.log(response.data.data.habitList);
          }
        } catch (error) {
          setError(error instanceof AxiosError ? true : false);
        }
      };
      getNewHabit();
    } else if (name === "done") {
      const getDoneHabit = async () => {
        try {
          const response = await AxiosAPI.doneHabit(page);
          if (response.status === 200) {
            if (page === 0) {
              setDoneHabitInfoData(response.data.data.habitList);
            } else {
              setDoneHabitInfoData((prevList) =>
                prevList.concat(response.data.data.habitList)
              );
            }
            setLoading(false);
            setHasMore(response.data.data.habitList.length > 0);
            console.log(response.data.data.habitList);
          }
        } catch (error) {
          setError(error instanceof AxiosError ? true : false);
        }
      };
      getDoneHabit();
    }
  }, [page, name, setNewHabitInfoData, setDoneHabitInfoData]);

  useEffect(() => {
    sendQuery();
  }, [query, sendQuery, page]);

  return { loading, error, hasMore };
}

export default useIntersect;