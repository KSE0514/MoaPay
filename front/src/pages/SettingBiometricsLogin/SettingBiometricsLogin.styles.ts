import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: var(--light-purple);
  padding: 30% 10% 0% 10%;
  width: 100%;
  height: 100vh;
  .area {
    background-color: white;
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 70px 10px 0px 10px;
  }
`;
export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    text-align: center;
    font-size: 40px;
    font-weight: 800;
    margin-bottom: 20px;
  }
  p {
    font-size: 20px;
    margin-bottom: 30px;
  }
  div {
    width: 100px;
    height: 100px;
    & > svg,
    & > img {
      width: 100%;
      height: 100%;
    }
  }
`;
export const Button = styled.button`
  width: 70%;
  height: 50px;
  background-color: #c473f6;
  border: none;
  border-radius: 10px;
  margin-top: 30px;
  font-size: 20px;
  color: white;
`;
export const BioIcon = styled(FontAwesomeIcon)``;
