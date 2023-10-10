import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";
import Box from "../components/common/Box";
import Container from "../components/common/Container";
import Navbar from "../components/common/NavBar";
import { ReactComponent as SearchBar } from "../resources/Icons/searchBar.svg";

const SearchPage: React.FC = () => {
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<{ id: number; tag: string }[]>([]);
  const [nextId, setNextId] = useState<number>(1);

  const onClickSearch = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      const nextTags = tags.concat({
        id: nextId,
        tag: tag,
      });
      setNextId(nextId + 1);
      setTags(nextTags);
      setTag("");
    }
  };

  const onChangeTag = (e: ChangeEvent<HTMLInputElement>): void => {
    setTag(e.target.value);
  };

  // 태그 지우기
  const onRemove = (id: number) => {
    const nextTags = tags.filter((tags) => tags.id !== id);
    setTags(nextTags);
  };
  const tagList = tags.map((tags) => (
    <div className="tag" key={tags.id} onDoubleClick={() => onRemove(tags.id)}>
      {tags.tag}
    </div>
  ));

  return (
    <Box>
      <Container>
        <SearchContainer>
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
        </SearchContainer>
        <Navbar />
      </Container>
    </Box>
  );
};

const SearchContainer = styled.div`
  .searchBar {
    position: relative;
    width: 80%;
    margin: 0 auto;
    display: flex;
  }

  .taglist {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start; /* 수평으로 좌측 정렬 */
  }

  .tag {
    background-color: #363636;
    padding: 5px;
    color: white;
    font-size: 16px;
    margin: 10px;
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

export default SearchPage;
