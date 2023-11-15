import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";
import Box from "../components/common/Box";
import Container from "../components/common/Container";
import Navbar from "../components/common/NavBar";
import { ReactComponent as SearchBar } from "../resources/Icons/searchBar.svg";
import { ReactComponent as Close } from "../resources/Icons/close.svg";

import useViewport from "../util/viewportHook";
import NewHabitContainer from "../components/Search/NewHabitContainer";
import SuccesHabitContainer from "../components/Search/SuccesHabitContainer";
import Alert from "../components/common/Alert";
import TagErrorAlert from "../components/HabitEdit/TagErrorAlert";
import SearchHabitContainer from "../components/Search/SearchHabitContainer";

const SearchPage = () => {
  const { isMobile } = useViewport();
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<{ id: number; tag: string }[]>([]);
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
  };

  const onEasyTagClick = (easyTag: string): void => {
    if (tags.length < 3) {
      const tagAlreadyExists = tags.some((tag) => tag.tag === easyTag);
      if (!tagAlreadyExists) {
        const nextTags = tags.concat({
          id: nextId,
          tag: easyTag,
        });
        setNextId(nextId + 1);
        setTags(nextTags);
      } else {
        const nextTags = tags.filter((tag) => tag.tag !== easyTag);
        setTags(nextTags);
      }
    } else openTagLimitErrorAlert();
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
      <Box>
        <Container>
          <SearchContainer $isMobile={isMobile}>
            <div className="searchBar">
              <input
                className="input"
                placeholder="습관 이름 또는 습관 키워드 검색"
                type="text"
                value={tag}
                onKeyPress={onClickSearch}
                onChange={onChangeTag}
              />
              <div className="taglist">{tagList}</div>
              <div className="img">
                <SearchBar />
              </div>
            </div>
            <EasyTagList>
              <button
                className={`easyTag ${
                  tags.some((tag) => tag.tag === "운동") ? "active" : ""
                }`}
                onClick={() => onEasyTagClick("운동")}
              >
                🏓 운동
              </button>
              <button
                className={`easyTag ${
                  tags.some((tag) => tag.tag === "공부") ? "active" : ""
                }`}
                onClick={() => onEasyTagClick("공부")}
              >
                📖 공부
              </button>
              <button
                className={`easyTag ${
                  tags.some((tag) => tag.tag === "코딩") ? "active" : ""
                }`}
                onClick={() => onEasyTagClick("코딩")}
              >
                💻 코딩
              </button>
              <button
                className={`easyTag ${
                  tags.some((tag) => tag.tag === "생활") ? "active" : ""
                }`}
                onClick={() => onEasyTagClick("생활")}
              >
                💊 생활
              </button>
              <button
                className={`easyTag ${
                  tags.some((tag) => tag.tag === "취미") ? "active" : ""
                }`}
                onClick={() => onEasyTagClick("취미")}
              >
                🎨 취미
              </button>
            </EasyTagList>
          </SearchContainer>
          {tags.length === 0 && (
            <>
              <NewHabitContainer />
              <SuccesHabitContainer />
            </>
          )}
          {tags.length !== 0 && <SearchHabitContainer tagList={tags} />}

          <Navbar />
        </Container>
      </Box>
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

const SearchContainer = styled.div<{ $isMobile: boolean }>`
  z-index: 99;
  width: ${(props) => (props.$isMobile ? "100%" : "768px;")};
  position: fixed;
  background-color: white;
  .searchBar {
    position: relative;
    width: 80%;
    align-items: flex-end;
    margin: 0 auto;
    display: flex;
  }

  .taglist {
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

  .input {
    width: 100%;
    padding: 10px;
    padding-left: 40px;
    background-color: #e8e8e8;
    border-radius: 5px;
    border: none;
    margin-top: 50px;
    outline: none;
  }

  .img {
    position: absolute;
    top: 10px;
    left: 12px;
    margin-top: 52px;
  }
`;

const EasyTagList = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  padding-bottom: 15px;

  .easyTag {
    background-color: #e8e8e8;
    border-radius: 20px;
    padding: 8px;
    color: #363636;
    white-space: nowrap;
    font-size: 14px;
    margin-right: 10px;
    margin-top: 10px;
  }

  .active {
    background-color: #363636;
    color: white;
  }
`;

export default SearchPage;
