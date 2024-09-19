import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 78px 47px 191px 47px;
  z-index: 50;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  h1 {
    font-size: 36px;
    font-weight: 400;
    margin-bottom: 48px;
  }
  img {
    width: 216px;
    height: 343px;
  }
`;
export const Benefits = styled.div`
  header {
    margin-top: 78px;
    margin-bottom: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    .line {
      width: 100px;
      height: 2px;
      background-color: #b97df9;
      display: block;
    }
    span {
      margin: 0px 10px;
      color: #b97df9;
      font-size: 20px;
      font-weight: 400;
    }
  }
  ul {
    div {
      height: 100%;
      width: 100%;
      display: flex;
    }
    p {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #676767;
      margin-right: 10px;
      margin-top: 10px;
    }
    li {
      flex: 1;
      color: #676767;
      font-size: 20px;
      margin-bottom: 15px;
      line-height: 25px;
    }
  }
`;
