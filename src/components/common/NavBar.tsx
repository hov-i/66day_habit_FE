import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { ReactComponent as Home } from "../../resources/Icons/home.svg";
import { ReactComponent as Like } from "../../resources/Icons/like.svg";
import { ReactComponent as Person } from "../../resources/Icons/person.svg";
import { ReactComponent as Search } from "../../resources/Icons/search.svg";
import useViewport from "../../util/viewportHook";

const Navbar = () => {
  const { isMobile } = useViewport();

  if (isMobile) {
    return null;
  }

  return (
    <NavContainer>
      <CustomLink to={"/main"}>
        <Home />
      </CustomLink>

      <CustomLink to={"/search"}>
        <Search />
      </CustomLink>

      <CustomLink to={"/commend"}>
        <Like />
      </CustomLink>

      <CustomLink to={"/mypage"}>
        <Person />
      </CustomLink>
    </NavContainer>
  );
};
export default Navbar;

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  border-top: 1px solid rgba(54, 54, 54, 0.28);
  width: 768px;
  height: 69px;
  z-index: 99;
  background-color: white;
`;

const CustomLink = styled(NavLink)`
  margin: 20px;
  > svg {
    fill: #888888;
  }
  &.active {
    > svg {
      fill: #363636;
    }
  }
`;
