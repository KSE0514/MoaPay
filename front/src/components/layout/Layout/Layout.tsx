import { Outlet } from "react-router-dom";
import { Wrapper } from "./Layout.styles";
import Nav from "../Nav/Nav";
const Layout = () => {
  return (
    <Wrapper>
      <Outlet />
      <Nav />
    </Wrapper>
  );
};
export default Layout;
