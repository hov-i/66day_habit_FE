import React, { useRef, useState, MouseEvent } from "react";
import styled from "styled-components";
import { ScrollBoxProps } from "../../util/types";

const ScrollBox: React.FC<ScrollBoxProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [clickPoint, setClickPoint] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDownEvent = (e: MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    if (containerRef.current) {
      setClickPoint(e.pageX);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleMouseMoveEvent = (e: MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;

    e.preventDefault();

    if (containerRef.current) {
      const walk = e.pageX - clickPoint;

      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };
  return (
    <ScrollBoxStyle
      ref={containerRef}
      onMouseDown={handleMouseDownEvent}
      onMouseLeave={() => setDragging(false)}
      onMouseUp={() => setDragging(false)}
      onMouseMove={handleMouseMoveEvent}
    >
      {children}
    </ScrollBoxStyle>
  );
};

const ScrollBoxStyle = styled.div`
  width: 100%;
  display: flex;
  overflow: scroll;
  cursor: grab;
`;

export default ScrollBox;
