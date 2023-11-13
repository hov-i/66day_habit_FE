import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import HabitBox from "../Main/HabitBox";
import useIntersect from "../../util/intersectHook";
import { useRecoilValue } from "recoil";
import { doneHabitInfoState } from "../../util/habitState";

const SuccesHabitContainer = () => {
  const [pageNum, setPageNum] = useState<number>(0);
  const { loading, error, hasMore } = useIntersect(pageNum, "done");
  const observer = useRef<IntersectionObserver | null>(null);
  const doneHabitInfoData = useRecoilValue(doneHabitInfoState);

  const lastHabitElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <Container>
      <div className="title">🎉 66일 명예의 전당</div>
      <div className="habitContainer">
        {doneHabitInfoData.map((data, index) => {
          // 마지막 요소인 경우 IntersectionObserver를 적용합니다.
          const isLastElement = doneHabitInfoData.length === index + 1;
          return isLastElement ? (
            <>
              <HabitBox
                name="done"
                key={index}
                habitId={data.habitId}
                ref={lastHabitElementRef}
              />
            </>
          ) : (
            <>
              <HabitBox name="done" key={index} habitId={data.habitId} />
            </>
          );
        })}
        {/* 데이터 로딩 중인 경우 "Loading..."을 표시합니다. */}
        <div>{loading && "Loading..."}</div>

        {/* 데이터 가져오기 중 오류가 발생한 경우 "Error..."를 표시합니다. */}
        <div>{error && "Error..."}</div>
      </div>
    </Container>
  );
};
const Container = styled.div`
  padding-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .title {
    font-weight: bolder;
    font-size: 24px;
    text-align: left;
    width: 80%;
  }
  .habitContainer {
    height: 300px;
    overflow: scroll;
    width: 80%;
  }
`;

export default SuccesHabitContainer;
