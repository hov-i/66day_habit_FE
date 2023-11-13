import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";
import { ReactComponent as Close } from "../../resources/Icons/close.svg";
import useViewport from "../../util/viewportHook";
import Alert from "../common/Alert";
import TagErrorAlert from "./TagErrorAlert";
import { TagEditBoxProps } from "../../util/types";

const TagEditBox: React.FC<TagEditBoxProps> = ({
  name,
  placeholder,
  setTagValue,
  title,
  value,
}) => {
  const { isMobile } = useViewport();
  const tagsValue = name === "edit" ? value : null;
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<{ id: number; tag: string }[]>(
    tagsValue ? tagsValue : []
  );
  const [nextId, setNextId] = useState<number>(1);
  const [tagLimitErrorAlert, setTagLimitErrorAlert] = useState(false);
  const [tagInputErrorAlert, setTagInputErrorAlert] = useState(false);
  const openTagLimitErrorAlert = () => {
    setTagLimitErrorAlert(true);
  };

  const closeTagLimitErrorAlert = () => {
    setTagLimitErrorAlert(false);
  };
  const openTagInputErrorAlert = () => {
    setTagInputErrorAlert(true);
  };

  const closeTagInputErrorAlert = () => {
    setTagInputErrorAlert(false);
  };
  const onClickSearch = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && tags.length < 3 && tag !== "") {
      const nextTags = tags.concat({
        id: nextId,
        tag: tag,
      });
      setNextId(nextId + 1);
      setTags(nextTags);
      setTag("");
      const tagsArray = nextTags.map((tag) => tag.tag);
      setTagValue(tagsArray);
    } else if (e.key === "Enter" && tags.length >= 3) {
      openTagLimitErrorAlert();
    } else if (e.key === "Enter" && tag === "") {
      openTagInputErrorAlert();
      console.log(tag);
    }
  };

  const onChangeTag = (e: ChangeEvent<HTMLInputElement>): void => {
    setTag(e.target.value);
  };

  const onRemove = (id: number): void => {
    const nextTags = tags.filter((tag) => tag.id !== id);
    setTags(nextTags);
    const tagsArray = nextTags.map((tag) => tag.tag);
    setTagValue(tagsArray);
  };

  const tagList = tags.map((tag) => (
    <div className="tag" key={tag.id} onClick={() => onRemove(tag.id)}>
      {tag.tag}
      <div className="close">
        <Close />
      </div>
    </div>
  ));

  return (
    <>
      <EditContainer $isMobile={isMobile}>
        <div className="name">{title}</div>
        <div className="inputBox">
          <input
            type="text"
            className="input"
            placeholder={placeholder}
            onKeyPress={onClickSearch}
            onChange={onChangeTag}
            value={tag}
          />
          <div className="taglist">{tagList}</div>
        </div>
      </EditContainer>
      {tagLimitErrorAlert && (
        <Alert
          open={tagLimitErrorAlert}
          close={closeTagLimitErrorAlert}
          name="태그3개 제한 에러"
        >
          <TagErrorAlert
            errorCode="태그 3개이상 입력 에러"
            onClose={closeTagLimitErrorAlert}
          />
        </Alert>
      )}
      {tagInputErrorAlert && (
        <Alert
          open={tagInputErrorAlert}
          close={closeTagInputErrorAlert}
          name="태그 빈칸 입력 에러"
        >
          <TagErrorAlert
            errorCode="빈칸 입력"
            onClose={closeTagInputErrorAlert}
          />
        </Alert>
      )}
    </>
  );
};

const EditContainer = styled.div<{ $isMobile: boolean }>`
  font-size: 16px;
  width: ${(props) => (props.$isMobile ? "75%" : "80%")};
  padding-bottom: 30px;
  .inputBox {
    display: flex;
  }
  .tag {
    background-color: #363636;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 8px;
    color: white;
    white-space: nowrap;
    font-size: 14px;
    margin: 0;
    margin-left: 10px;
  }
  .close {
    margin-left: 5px;
    margin-right: 5px;
  }
  .taglist {
    display: flex;
  }
  .name {
    margin-left: 3px;
  }
  .input {
    width: 100%;
    background-color: #e8e8e8;
    font-size: 16px;
    border: none;
    outline: none;
    border-radius: 5px;
    border: 0;
    height: 35px;
    padding-left: 10px;
    margin-top: 10px;
  }
`;

export default TagEditBox;
