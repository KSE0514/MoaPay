import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const Wrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background-color: white;
  div {
    flex: 1;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 7px;
    & p {
      font-weight: 500;
      font-size: 17px;
      text-align: center;
    }
  }
  .active {
    & > * {
      color: #c473f6;
    }
  }
`;
export const StyledIcon = styled(FontAwesomeIcon)`
  width: 30px;
  height: 30px;
  color: #4a4a4a;
`;
