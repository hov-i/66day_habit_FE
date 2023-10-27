import React, { useState } from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import { ReactComponent as Drop } from "../../resources/Icons/drop.svg";
interface DisclosureSelectProps {
  setSeletValue: (value: string) => void;
}

const DisclosureSelect: React.FC<DisclosureSelectProps> = ({
  setSeletValue,
}) => {
  const { isMobile } = useViewport();
  const [selected, setSelected] = useState<string | null>(null);

  const handleOnChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelected(selectedValue);
    setSeletValue(selectedValue);
  };

  return (
    <EditContainer isMobile={isMobile}>
      <div className="name">공개 범위</div>
      <div className="custom-select">
        <select
          id="color-select"
          onChange={handleOnChangeSelect}
          value={selected || ""}
        >
          <option value="PUBLIC">공개</option>
          <option value="PRIVATE">비공개</option>
          <option value="FRIENDS_ONLY">팔로워</option>
        </select>
        <span className="arrow">
          <Drop />
        </span>
      </div>
    </EditContainer>
  );
};

const EditContainer = styled.div<{ isMobile: boolean }>`
  font-size: 16px;
  width: ${(props) => (props.isMobile ? "75%" : "80%")};
  padding-bottom: 30px;
  .name {
    margin-left: 3px;
  }
  .custom-select {
    position: relative;
    display: inline-block;
  }

  .custom-select select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 100%;
    padding: 10px;
    padding-right: 30px;
    padding-left: 15px;
    margin-top: 10px;
    border: 1px solid #363636;
    border-radius: 5px;
    background-color: #fff;
    outline: none;
  }

  .custom-select .arrow {
    position: absolute;
    top: 50%;
    right: 7px;
    transform: translateY(-50%);
    font-size: 20px;
    pointer-events: none;
  }
`;

export default DisclosureSelect;
