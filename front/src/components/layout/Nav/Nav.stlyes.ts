import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const Wrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  z-index: 100;
  width: 100%;
  justify-content: space-around;
  padding: 30px 20px;
  border-top: 3px solid #4a4a4a;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;
export const StyledIcon = styled(FontAwesomeIcon)`
  width: 48px;
  height: 48px;
  color: #4a4a4a;
`;
